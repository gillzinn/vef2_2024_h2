"use client";

import React, { Component, ReactNode, useEffect } from "react";
import { fetchRegistrations } from "./fetch";

// Ef það er notandi í localStorage erum við með innskráðan notanda
// hér gætum við líka sótt token
let user = "";
let token = "";
if (typeof window !== "undefined") {
  user = localStorage.getItem("user") || "";
  token = localStorage.getItem("token") || "";
}

interface ContextType {
  fetching: boolean;
  authenticated: string;
  admin: boolean;
  token: string;
  user: string;
  message: string;
  regs: Array<[number, number]>; //Fyrra hnitið er eventId og seinna registration id
  loginUser: (username: string, password: string) => Promise<void>;
  logoutUser: () => void;
  addRegistration: (eventTitle: string) => Promise<void>;
  deleteRegistration: (regId: number) => Promise<void>;
}

export const Context = React.createContext<ContextType>({
  fetching: false,
  authenticated: user,
  admin: false,
  token,
  user,
  message: "",
  regs: [],
  loginUser: async (username: string, password: string) => {},
  logoutUser: () => {},
  addRegistration: async (eventTitle: string) => {},
  deleteRegistration: async (regId: number) => {},
});

interface UserProps {
  children: ReactNode; // Define children prop as ReactNode
}

export default class User extends Component<UserProps> {
  state = {
    fetching: false,
    authenticated: user,
    message: "",
    user,
    admin: false,
    token,
    regs: [],
  };

  loginUser = async (username: string, password: string) => {
    this.setState({ fetching: true });
    const body = { username: username, password: password };
    const login = await fetch(`https://vef2-2024-h1-iuos.onrender.com/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (login.status === 401) {
      this.setState({ message: "Rangt lykilorð", fetching: false });
    }

    if (login.status === 404) {
      this.setState({ message: "Fann ekki notenda", fetching: false });
    }

    if (login.ok) {
      const resData = await login.json();
      const { user } = resData;
      localStorage.setItem("token", resData.token);
      localStorage.setItem("user", user.name);
      const regsRes = await fetchRegistrations(
        `https://vef2-2024-h1-iuos.onrender.com/registrations`,
        user.name
      );
      if (regsRes) {
        this.setState({ regs: regsRes });
      }
      this.setState({
        user: user.name,
        fetching: false,
        authenticated: true,
        admin: user.admin,
        token: resData.token
      });
    }
  };

  logoutUser = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.setState({
      user: null,
      authenticated: false,
      admin: false,
      token: "",
      regs: [],
    });
  };

  addRegistration = async (eventTitle: string) => {
    const body = { eventTitle: eventTitle, username: user };
    console.log(token);
    console.log(user);
    const register = await fetch(
      `https://vef2-2024-h1-iuos.onrender.com/registrations`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    if (register.ok) {
      const resReg = await register.json();
      const currRegs: Array<[number, number]> = [...this.state.regs];
      currRegs.push([resReg.eventId, resReg.id]);
      this.setState({ regs: currRegs });
    }
  };

  deleteRegistration = async (regId: number) => {
    const deleteReg = await fetch(
      `https://vef2-2024-h1-iuos.onrender.com/registrations/${regId}`,
      {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      }
    );
    if (deleteReg.ok) {
      const delReg = await deleteReg.json();
      let currRegs: Array<[number, number]> = this.state.regs;
      currRegs = currRegs.filter(
        ([first, second]) => first !== delReg.eventId && second !== delReg.id
      );
      this.setState({ regs: currRegs });
    }
  };

  render(): ReactNode {
    const { children } = this.props;

    return (
      <Context.Provider
        value={{
          ...this.state,
          loginUser: this.loginUser,
          logoutUser: this.logoutUser,
          addRegistration: this.addRegistration,
          deleteRegistration: this.deleteRegistration,
        }}
      >
        {children}
      </Context.Provider>
    );
  }
}
