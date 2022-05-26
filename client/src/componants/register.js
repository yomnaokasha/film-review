import React, { useState } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";

const Login = (props) => {
  const { setUser } = props;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const register = (e) => {
    e.preventDefault();
    axios
      .post("/api/register", {
        firstName,
        lastName,
        email,
        passWord,
        confirmPassword,
      })
      .then(
        (res) => {
          console.log("Login succeeded", res);
          setUser(res.data);
          navigate("/films");
        },
        (err) => {
          console.log("register failed", err);
        }
      );
  };
  return (
    <form onSubmit={register}>
      <h1> Create your account</h1>
      <div class="container-sm">
        <div class="mb-3">
          <label for="formGroupExampleInput" class="form-label">
            First Name:{" "}
          </label>
          <input
            class="form-control"
            id="formGroupExampleInput"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="formGroupExampleInput" class="form-label">
            Last Name:{" "}
          </label>
          <input
            class="form-control"
            id="formGroupExampleInput"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="formGroupExampleInput" class="form-label">
            Email:{" "}
          </label>
          <input
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
            onChange={(e) => setPassWord(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="formGroupExampleInput" class="form-label">
            Confirm Password:{" "}
          </label>
          <input
            class="form-control"
            id="formGroupExampleInput"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <input class="btn btn-primary" type="submit" />
        <p>
          {" "}
          already have an account ? <Link to="/login">Sign-in</Link>{" "}
        </p>
      </div>
    </form>
  );
};

export default Login;
