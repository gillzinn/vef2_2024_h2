"use client";

import React, { useState } from "react";
import { redirect } from "next/navigation";
//import './login.css';
import { Context } from "../../../utils/User";
import styles from "./login.module.css";

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
        if (authenticated) {
          redirect("/");
        }

        if (fetching) {
          return (
            <div className={styles.loading}>
              <h3>
                Skrái inn <em>{name}</em>...
              </h3>
            </div>
          );
        }

        return (
          <React.Fragment>
            <div className="login">
              {message && <p>{message}</p>}

              <form
                className={styles.loginForm}
                onSubmit={handleSubmit(loginUser)}
              >
                <h3>Login</h3>
                <div>
                  <label className={styles.label} htmlFor="username">
                    Notendanafn:
                  </label>
                  <input
                    autoComplete="off"
                    id="username"
                    type="text"
                    name="username"
                    value={name}
                    onChange={handleInputChangeName}
                    className={styles.input}
                  />
                </div>

                <div>
                  <label className={styles.label} htmlFor="password">
                    Lykilorð:
                  </label>
                  <input
                    autoComplete="off"
                    id="password"
                    type="password"
                    name="password"
                    value={pass}
                    onChange={handleInputChangePass}
                    className={styles.input}
                  />
                </div>

                <button className={styles.button} disabled={fetching}>
                  Innskrá
                </button>
              </form>
            </div>
          </React.Fragment>
        );
      }}
    </Context.Consumer>
  );
}
