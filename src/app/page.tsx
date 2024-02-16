"use client";

import styles from "./page.module.css";

import React, {useState} from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (username === "bank100" && password === "full") {
      window.location.href = "/home";
    } else {
      window.alert("El usuario o la contraseña son in correctas");
    }
  };
  return (
    <main className={styles.main}>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    </main>
  );
};

export default Login;
