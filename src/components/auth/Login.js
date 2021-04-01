import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Login } from "../api/auth";
import loading from "../../img/loading.gif";
import "./auth.scss";
const LogIn = ({ isAuthenticated, setIsAuthenticated }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [Token, setToken] = useState("");
  const [Logging, setLogging] = useState(false);
  const history = useHistory();

  const redirectToHome = () => {
    history.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLogging(true);

    Login({
      username: user,
      password,
    })
      .then((res) => {
        localStorage.setItem("token", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        localStorage.setItem("username", user);
        setToken(res.data);
        setIsAuthenticated(true);
        setTimeout(() => {
          setLogging(false);
          redirectToHome();
        }, 1300);
      })
      .catch((err) => {
        setLogging(false);
        console.log(err);
      });
  };

  return (
    <div className="auth-form-container">
      {Logging ? (
        <div className="loader-container">
          <img src={loading} className="loader" />
        </div>
      ) : (
        ""
      )}

      <div className="auth-form-title">WELCOME BACK</div>
      {isAuthenticated ? (
        <div>You&#39;ve already logged in!</div>
      ) : (
        <form
          action=""
          method="POST"
          className="auth-form"
          onSubmit={handleSubmit}
        >
          <div className="auth-form-inputgroup">
            <input
              placeholder="Username"
              type="text"
              id="account"
              className="auth-form-input"
              onChange={(e) => {
                setUser(e.target.value);
              }}
            />
          </div>
          <div className="auth-form-inputgroup">
            <input
              placeholder="Password"
              type="password"
              id="password"
              className="auth-form-input"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <span className="auth-form-message">
            Haven&apos;t joined us?
            <Link className="auth-form-message-highlight" to="/signup">
              Sign up
            </Link>
          </span>
          <button className="auth-submit" type="submit">
            LOG IN
          </button>
        </form>
      )}
    </div>
  );
};

export default LogIn;
