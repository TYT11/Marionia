import React, { useState } from "react";
import styled from "styled-components";
import Instagram from "../../img/svg/instagram.svg";
import Facebook from "../../img/svg/facebook.svg";
import Twitter from "../../img/svg/twitter.svg";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer">
        <div className="footer-col">
          <ul className="footer-col-list">
            <li className="footer-col-list-icon">
              <img src={Facebook} alt="" />
            </li>
            <li className="footer-col-list-icon">
              <img src={Twitter} alt="" />
            </li>
            <li className="footer-col-list-icon">
              <img src={Instagram} alt="" />
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <ul className="footer-col-list-col">
            <a href="https://tyt.herokuapp.com/">
              <li>Porfolio</li>
            </a>
            <a href="https://github.com/TYT11/Marionia">
              <li>Frontend Code</li>
            </a>
            <a href="https://github.com/TYT11/Marionia-backend">
              <li>Backend Code</li>
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
