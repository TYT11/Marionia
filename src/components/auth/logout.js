import React from "react";
import { Redirect } from "react-router-dom";

const LogOut = ({ setIsAuthenticated }) => {
  localStorage.clear();
  setIsAuthenticated(false);
  return <Redirect to="/" />;
};

export default LogOut;
