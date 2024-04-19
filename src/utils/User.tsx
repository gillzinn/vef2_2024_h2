"use client";

import React, { Component, ReactNode, useEffect } from "react";

// Ef það er notandi í localStorage erum við með innskráðan notanda
// hér gætum við líka sótt token
let user = "";
let adminToken = "";
if (typeof window !== "undefined") {
  user = localStorage.getItem("user") || "";
  adminToken = localStorage.getItem("adminToken") || "";
}

export const Context = React.createContext({
  fetching: false,
  authenticated: user,
  admin: adminToken,
  adminToken,
  user,
  message: "",
  loginUser: async (username: string, password: string) => {},
  logoutUser: () => {},
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
    admin: adminToken,
    adminToken,
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
      localStorage.setItem("user", user.name);
      this.setState({
        user: user.name,
        fetching: false,
        authenticated: true,
        admin: user.admin,
      });
      if (user.admin) {
        localStorage.setItem("adminToken", resData.token);
        this.setState({ adminToken: resData.token });
      }
    }
  };

  logoutUser = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("adminToken");
    this.setState({
      user: null,
      authenticated: false,
      admin: false,
      adminToken: null,
    });
  };

  render(): ReactNode {
    const { children } = this.props;

    return (
      <Context.Provider
        value={{
          ...this.state,
          loginUser: this.loginUser,
          logoutUser: this.logoutUser,
        }}
      >
        {children}
      </Context.Provider>
    );
  }
}
