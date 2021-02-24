import React, { useState, useEffect } from "react";

import "./ShoppingCart.scss";
import { Link, useHistory } from "react-router-dom";

import Cancel from "../../img/svg/cancel.svg";
import OpenPackage from "../../img/svg/package.svg";
import Success from "../../img/svg/success.svg";
import { Placeorder } from "../api/auth";
import loading from "../../img/loading.gif";

const ShoppingCart = () => {
  if (!localStorage.getItem("shopping")) {
    localStorage.setItem("shopping", "[]");
  }
  const [savedItem, setSavedItem] = useState(
    JSON.parse(localStorage.getItem("shopping"))
  );
  const [cancelIdx, setCancelIdx] = useState("");
  const [orderSubmit, setOrderSubmit] = useState(false);
  const [formInput, setFormInput] = useState({
    address: "",
    phone: "",
    name: "",
  });
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const [submitting, setSubmitting] = useState(false);

  const history = useHistory();

  const redirectTo = (place) => {
    history.push(place);
  };

  const removeItem = (toRemove) => {
    setSavedItem((prev) => prev.filter((item) => item !== toRemove));
  };

  const handleQtyChange = (num, toChange) => {
    setSavedItem((prev) =>
      prev.map((item) => {
        if (item === toChange) return { ...item, qty: num };
        return item;
      })
    );
  };

  const handleSubmit = () => {
    if (username) {
      setSubmitting(true);
      const items = savedItem.map((item) => ({
        status: 1,
        username,
        address: formInput.address,
        name: formInput.name,
        phone: formInput.phone,
        total: savedItem.reduce((acc, cur) => acc + cur.price * cur.qty, 0),
        item: item.id,
        qty: item.qty,
        num: item.price,
        order: 1,
      }));

      Placeorder(items, token)
        .then(() => {
          setOrderSubmit(true);
          setSavedItem([]);
          setTimeout(() => {
            setOrderSubmit(false);
            redirectTo("/order");
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
        });
      setSubmitting(false);
      return;
    }
    setSubmitting(false);
    alert("Please log in!");
    redirectTo("/login");
  };

  useEffect(() => {
    localStorage.setItem("shopping", JSON.stringify(savedItem));
  }, [savedItem]);

  return savedItem.length !== 0 ? (
    <div className="shopping">
      <div className="shopping-list">
        <div className="shopping-list-title">MY BAG</div>

        {savedItem.map((item, idx) => (
          <>
            <div
              className={`line shopping-line ${
                cancelIdx === idx + item.title ? "LineFade" : ""
              } `}
            />

            <div
              className={`shopping-card ${
                cancelIdx === idx + item.title ? "CartFade" : ""
              }`}
            >
              <div
                className="shopping-list-cancel"
                onClick={() => {
                  setCancelIdx(idx + item.title);
                  setTimeout(() => {
                    setCancelIdx("");
                    removeItem(item);
                  }, 1000);
                }}
              >
                <img src={Cancel} alt="" />
              </div>

              <div className="shopping-card-img">
                <Link to={`/details/${item.id}`}>
                  <img
                    src={`${process.env.PUBLIC_URL}/img/${item.img}.png`}
                    alt=""
                  />
                </Link>
              </div>
              <div className="shopping-card-text">
                <div className="shopping-card-title">{item.title}</div>

                <div className="shopping-card-details">
                  <div className="shopping-card-details-price">
                    ${item.qty * item.price}
                  </div>
                  <div className="shopping-card-details-quantity">
                    <select
                      name=""
                      className="shopping-card-details-quantity-select"
                      value={item.qty}
                      onChange={(e) => {
                        handleQtyChange(e.target.value, item);
                      }}
                    >
                      {[...Array(item.stock)].map((option, index) => (
                        <option key={index} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}

        <div className="shopping-summary">
          <div className="line" />
          <div className="shopping-total">
            <div className="shopping-total-field">
              <span>Delivery:</span>
              <span>FREE</span>
            </div>
            <div className="shopping-total-field total">
              <span>Total:</span>
              <span>
                NT $
                {savedItem.reduce((acc, cur) => acc + cur.price * cur.qty, 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="shopping-form-container-wrapper">
        <div className="shopping-form-container">
          <div className="shopping-list-title">SHIPPING INFORMATION</div>
          {submitting ? (
            <div className="loader-container">
              <img src={loading} className="loader" alt="loader" />
            </div>
          ) : (
            ""
          )}
          {username ? (
            <form
              action=""
              className="shopping-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="shopping-form-field">
                <label htmlFor="name">Name:</label>
                <input
                  required
                  type="text"
                  className="shopping-form-input"
                  id="name"
                  minLength="2"
                  maxLength="30"
                  name="name"
                  onChange={(e) => {
                    const key = e.target.name;
                    const { value } = e.target;
                    setFormInput((prev) => ({
                      ...prev,
                      [key]: value,
                    }));
                  }}
                />
              </div>

              <div className="shopping-form-field">
                <label htmlFor="address">Address</label>
                <input
                  required
                  type="text"
                  className="shopping-form-input"
                  id="address"
                  name="address"
                  minLength="5"
                  maxLength="30"
                  onChange={(e) => {
                    const key = e.target.name;
                    const { value } = e.target;
                    setFormInput((prev) => ({
                      ...prev,
                      [key]: value,
                    }));
                  }}
                />
              </div>

              <div className="shopping-form-field">
                <label htmlFor="phone">Phone</label>
                <input
                  required
                  type="text"
                  className="shopping-form-input"
                  id="phone"
                  name="phone"
                  pattern="\d*"
                  maxLength="10"
                  minLength="8"
                  inputMode="numeric"
                  onChange={(e) => {
                    const key = e.target.name;
                    const { value } = e.target;
                    setFormInput((prev) => ({
                      ...prev,
                      [key]: value,
                    }));
                  }}
                />
              </div>
              <div className="shopping-form-field-check  ">
                <input
                  type="checkbox"
                  className="shopping-form-field-check-input"
                  id="save"
                />
                <label htmlFor="save">
                  Save contact information for my next orders.
                </label>
              </div>
              <button type="button" className="shopping-form-button">
                PLACE ORDER
              </button>
            </form>
          ) : (
            <div>
              Please{" "}
              <Link to="/login" style={{ color: "#999", fontWeight: 800 }}>
                log in
              </Link>{" "}
              to submit the order.
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <>
      {orderSubmit ? (
        <div className="submitorder">
          <div className="submitorder-icon">
            <img src={Success} alt="" />
          </div>
          <div className="submitorder-message">
            <div className="submitorder-message-title">Success</div>
            <span className="submitorder-message-sub">
              Your order has been placed.
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="empty-cart">
        <img src={OpenPackage} alt="" />
        <div className="empty-cart-text">
          <div className="empty-cart-title">Your cart is empty!</div>
          <br />
          <span className="empty-cart-info">
            Looks like you haven`&#39;`t added anything yet.
          </span>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
