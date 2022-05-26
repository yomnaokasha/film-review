import React, { useState } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";

const Login = (props) => {
  const { setUser } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onLogin = (e) => {
    e.preventDefault();
    axios.post("/api/login", { email, passWord: password }).then(
      (res) => {
        console.log("Login succeeded", res);
        setUser(res.data);
        navigate("/films");
      },
      (err) => {
        console.log("Login failed", err);
      }
    );
  };
  return (
    <form onSubmit={onLogin}>
      <h1>Sign in</h1>
      <div class="container-sm">
        <div class="mb-3">
          <label for="formGroupExampleInput" class="form-label">
            Email:
          </label>
          <input
            width="10px"
            class="form-control"
            id="formGroupExampleInput"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="formGroupExampleInput" class="form-label">
            Password:{" "}
          </label>
          <input
            class="form-control"
            id="formGroupExampleInput"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <input class="btn btn-primary" type="submit" value="Login" />
        </div>
        <div class="mb-3">
          <p>
            If you don't have account register <Link to="/register">Here</Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Login;
