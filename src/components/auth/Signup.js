import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./auth.scss";
import { Signup, Login } from "../api/auth";
import loading from "../../img/loading.gif";

const SignUp = ({ setIsAuthenticated }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [Err, setErr] = useState("");
  const history = useHistory();
  const [signing, setSigning] = useState(false);

  const redirectToHome = () => {
    history.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSigning(true);

    Signup({
      username: user,
      password,
    })
      .then((res) => {
        Login({
          username: user,
          password,
        })
          .then((res) => {
            localStorage.setItem("token", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);
            localStorage.setItem("username", user);
            setIsAuthenticated(true);
            setSigning(false);
            redirectToHome();
          })
          .catch((res) => {
            console.log(res);
            setSigning(false);
          });
      })
      .catch((err) => {
        const error = JSON.parse(err.request.response);
        const key = Object.keys(error)[0];
        setErr(error[key]);
        setSigning(false);
        alert("Please try agian!");
      });
  };

  return (
    <div className="auth-form-container">
      {signing ? (
        <div className="loader-container">
          <img src={loading} className="loader" />
        </div>
      ) : (
        ""
      )}
      <div className="auth-form-title">SIGN UP</div>
      <form
        action=""
        method="POST"
        className="auth-form"
        onSubmit={handleSubmit}
      >
        <div className="auth-form-inputgroup">
          <input
            type="text"
            id="account"
            placeholder="Username"
            className="auth-form-input"
            onChange={(e) => {
              setUser(e.target.value);
            }}
          />
        </div>

        <div className="auth-form-inputgroup">
          <input
            type="password"
            id="account"
            placeholder="Password"
            className="auth-form-input"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <span className="auth-form-message">
          Have an acocunt already?
          <Link className="auth-form-message-highlight" to="/login">
            Log in
          </Link>
          <br />
          {Err}
        </span>
        <button className="auth-submit" type="submit">
          SIGN UP
        </button>
      </form>
    </div>
  );
};

export default SignUp;
