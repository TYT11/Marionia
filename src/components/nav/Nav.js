import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link, NavLink, useLocation, withRouter } from "react-router-dom";

import Diamond from "../../img/svg/diamond.svg";
import "./Nav.scss";
import { ReactComponent as Profile } from "../../img/svg/user.svg";
import { ReactComponent as Cart } from "../../img/svg/shopping_cart.svg";
import { ReactComponent as Search } from "../../img/svg/magnifying-glass.svg";

const NavLogo = styled.div`
  margin-left: 1rem;
  width: 1.7rem;
  height: 1.7rem;
  background-image: url(${Diamond});
`;

const Nav = (props) => {
  const [SearchClicked, setSearchClicked] = useState(false);
  const [HideNav, setHideNav] = useState(true);
  const [SearchInput, setSearchInput] = useState("");
  const dropdown = useRef(null);
  const checkbox = useRef(null);
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchClicked(false);
    props.history.push(`/search/?q=${SearchInput}`);
    setSearchInput("");
  };

  const checkDropdownOpen = (e) => {
    if (e.target.checked) {
      dropdown.current.classList.add("active");
    } else {
      dropdown.current.classList.remove("active");
    }
  };

  useEffect(() => {
    dropdown.current.classList.remove("active");
    checkbox.current.checked = false;
  }, [location]);

  return (
    <nav>
      <div className="nav-inner">
        <div className="leftWrapper">
          <div className="hamburger">
            <input
              type="checkbox"
              id="hamburger-toggle"
              className="hamburger-check"
              defaultChecked={HideNav ? "" : "checked"}
            />
            <label
              htmlFor="hamburger-toggle"
              className="hamburger-toggle"
              onClick={() => {
                setHideNav((prev) => !prev);
              }}
            >
              <span className="hamburger-line" />
            </label>

            <ul className="category">
              <ul className="category-list">
                <NavLink
                  to="/category/shells"
                  exact
                  className="category-item"
                  activeClassName="category-active"
                  onClick={() => {
                    setHideNav(true);
                  }}
                >
                  <li>SHELLS</li>
                </NavLink>
                <NavLink
                  to="/category/weapons"
                  exact
                  className="category-item"
                  activeClassName="category-active"
                  onClick={() => {
                    setHideNav(true);
                  }}
                >
                  <li>WEAPONS</li>
                </NavLink>
                <NavLink
                  to="/category/mushrooms"
                  exact
                  className="category-item"
                  activeClassName="category-active"
                  onClick={() => {
                    setHideNav(true);
                  }}
                >
                  <li>MUSHROOMS</li>
                </NavLink>
                <NavLink
                  to="/category/mystery"
                  exact
                  className="category-item"
                  activeClassName="category-active"
                  onClick={() => {
                    setHideNav(true);
                  }}
                >
                  <li>MYSTERY BOX</li>
                </NavLink>
              </ul>
            </ul>

            <div
              className="mask"
              onClick={() => {
                setHideNav(true);
              }}
            />
          </div>
          <Link to="/">
            <NavLogo />
          </Link>

          <ul className="leftWrapper-list-desktop">
            <NavLink
              to="/category/shells"
              exact
              activeClassName="desktop-active"
            >
              <li>SHELLS</li>
            </NavLink>
            <NavLink
              to="/category/weapons"
              exact
              activeClassName="desktop-active"
            >
              <li>WEAPONS</li>
            </NavLink>
            <NavLink
              to="/category/mushrooms"
              exact
              activeClassName="desktop-active"
            >
              <li>MUSHROOMS</li>
            </NavLink>
            <NavLink
              to="/category/mystery"
              exact
              activeClassName="desktop-active"
            >
              <li>MYSTERY BOX</li>
            </NavLink>
          </ul>
        </div>

        <div className={SearchClicked ? "search search-active" : "search"}>
          <form action="" className="search-form" onSubmit={handleSubmit}>
            <div
              className={SearchClicked ? "search-cancel-container" : ""}
              onClick={() => {
                setSearchClicked(false);
              }}
            >
              <span className="search-cancel-active" />
            </div>
            <div className="search-wrapper">
              <input
                type="text"
                className="search-input"
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
                value={SearchInput}
              />
              <button
                type="submit"
                disabled={SearchInput === ""}
                className="search-button"
              >
                <Search className="search-button-svg" />
              </button>
              <button
                type="button"
                disabled={SearchInput === ""}
                className="search-button-small"
              >
                <Search className="search-button-svg-small" />
              </button>
            </div>
          </form>
        </div>

        <div className="rightWrapper">
          <ul className="rightWrapper-inner">
            <li className="profile profile-hidden">
              <button
                type="button"
                onClick={() => {
                  setSearchClicked(true);
                }}
              >
                <Search className="search-button-svg" />
              </button>
            </li>

            <li
              className="profile dropdown"
              ref={dropdown}
              onChange={checkDropdownOpen}
            >
              <input
                ref={checkbox}
                type="checkbox"
                id="isDropdownOpen"
                className="profile-link"
                style={{ display: "none" }}
              />
              <label
                className="isDropdownOpen"
                htmlFor="isDropdownOpen"
                style={{ height: "17px" }}
              >
                <Profile width="17px" height="17px" />
              </label>

              <div className="profile-list account">
                <ul>
                  {props.isAuthenticated ? (
                    <>
                      <Link to="/logout">
                        <li>LOG OUT</li>
                      </Link>
                      <Link to="/order">
                        <li>ORDERS</li>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/signup">
                        <li>SIGN UP</li>
                      </Link>
                      <Link to="/login">
                        <li>LOG IN</li>
                      </Link>
                    </>
                  )}
                </ul>
              </div>
            </li>

            <li className="profile">
              <Link to="/checkout" className="profile-link">
                <Cart width="17px" height="17px" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Nav);
