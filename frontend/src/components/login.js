import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
const Login = (props) => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const login = () => {
    props.login({ name: userName, id: userId });
    setLoginSuccess(true);
    setTimeout(() => {
      props.history.push("/");
    }, 1000);
  };

  return (
    <div>
      {loginSuccess && <Alert variant="success">Login Success!</Alert>}
      <h1>Login</h1>
      <form>
        <label>
          User Name:
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <br />
        <label>
          User ID:
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </label>
        <br />
        <Button type="button" onClick={login}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
