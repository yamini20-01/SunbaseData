import "./styles.css";
import Login from "./Login";
import React from "react";
import Main from "./Main";

export default function App() {
  const [token, setToken] = React.useState(null);
  if (true) {
    return <Main bearerToken={token}/>;
  }
  return <Login setAuthToken={setToken} />;
}
