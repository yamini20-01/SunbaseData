import { authenticateUser } from "./auth.js";
import React from "react";

export default function Login(setAuthToken) {
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  function handleSubmit() {
    const login_id = "test@sunbasedata.com";
    const password = "Test@123";
    // const login_id = login;
    event.preventDefault(); // Prevent the default form submission

    authenticateUser(login_id, password)
      .then((bearerToken) => {
        console.log("Bearer Token:", bearerToken);
        setAuthToken(bearerToken);
      })
      .catch((error) => {
        console.error(error);
      });

    return false;
  }
  return (
    <div className="App">
      <h1>Login</h1>
      <form id="loginForm" onSubmit={handleSubmit}>
        <input
          type="text"
          id="login_id"
          name="login_id"
          required
          value={login}
          placeholder="Login"
          onChange={(e) => setLogin(e.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
      <div id="message"></div>
    </div>
  );
}
