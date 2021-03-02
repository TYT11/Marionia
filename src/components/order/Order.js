import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./order.scss";
import { Orderlist } from "../api/auth";
import HelmetTemplate from "../helmetTemplate";

const handleDate = (date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const localDate = new Date(date);
  const time = `${months[localDate.getMonth()]}. ${localDate.getDate()}`;
  return time;
};

const orderStatus = ["Processing", "Shipped", "Delivered"];

export default function Order() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    Orderlist(token)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setOrders(res.data);
        }
        return;
      })
      .catch((err) => console.log("err", err));
  }, []);

  return (
    <div className="order-container">
      <div className="order-title">MY ORDERS</div>
      <div className="order">
        <div className="order-list">
          {orders.length > 0
            ? orders.map((order, index) => (
                <div className="order-list-item" key={index}>
                  <div className="order-list-item-header">
                    <div className="order-list-item-title">#{order.order}</div>
                    <div className="order-list-item-date">
                      {handleDate(order.created)}
                    </div>
                    <div className="order-list-item-status">
                      {orderStatus[order.status - 1]}
                    </div>
                  </div>
                  <div className="order-list-item-sub">
                    <div className="order-list-item-total">${order.total}</div>
                    <div className="order-list-item-buttons">
                      <Link to={`/orderdetail/?n=${order.order}`}>
                        <button
                          className="order-list-item-buttons-detail"
                          type="submit"
                        >
                          DETAILS
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            : "You haven't ordered anything yet. Shop now!"}
        </div>
      </div>
      <HelmetTemplate subTitle="My Orders" des="Customer order panel">
        <meta name="robots" content="noindex, nofollow" />
      </HelmetTemplate>
    </div>
  );
}
export { handleDate, orderStatus };
