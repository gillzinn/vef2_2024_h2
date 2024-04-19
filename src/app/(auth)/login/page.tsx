"use client";

import React, { useState } from "react";
import { redirect } from 'next/navigation';
import './login.css';
import { Context } from "../../../utils/User";

export default function Login() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const handleInputChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
  };

  const handleInputChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPass(value);
  };

  const handleSubmit =
    (loginUser: (username: string, password: string) => Promise<void>) =>
    async (e: React.FormEvent) => {
      e.preventDefault();
      await loginUser(name, pass);
    };
  return (
    <Context.Consumer>
      {({ message, loginUser, fetching, authenticated }) => {
        if (authenticated) { redirect('/'); }

        if (fetching) {
          return (
            <p>
              Skrái inn <em>{name}</em>...
            </p>
          );
        }

        return (
          <React.Fragment>
            <div className="login">
              {message && <p>{message}</p>}

              <form onSubmit={handleSubmit(loginUser)}>
                <div>
                  <label htmlFor="username">Notendanafn:</label>
                  <input
                    autoComplete="off"
                    id="username"
                    type="text"
                    name="username"
                    value={name}
                    onChange={handleInputChangeName}
                  />
                </div>

                <div>
                  <label htmlFor="password">Lykilorð:</label>
                  <input
                    autoComplete="off"
                    id="password"
                    type="password"
                    name="password"
                    value={pass}
                    onChange={handleInputChangePass}
                  />
                </div>

                <button disabled={fetching}>Innskrá</button>
              </form>
            </div>
          </React.Fragment>
        );
      }}
    </Context.Consumer>
  );
}
