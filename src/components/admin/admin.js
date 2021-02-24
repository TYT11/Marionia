import React, { useEffect, useState } from "react";
import { handleDate, orderStatus } from "../order/Order";
import { Manageorder, Managestatus } from "../api/auth";

export default function admin() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  const updateForm = (order, status) => {
    Managestatus(order, status, token)
      .then(alert("Order Updated."))
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    Manageorder(token)
      .then((res) => {
        setOrders(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err.response));
  }, []);

  return (
    <div className="order-container">
      <div className="order-title">ALL ORDERS</div>
      <div className="order">
        <div className="order-list">
          {orders.length > 0
            ? orders.map((order) => (
                <div className="order-list-item">
                  <div className="order-list-item-header">
                    <div className="order-list-item-title">#{order.order}</div>
                    <div className="order-list-item-date">
                      {handleDate(order.created)}
                    </div>
                    <div className="order-list-item-status">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          updateForm(order.order, e.target.children[0].value);
                        }}
                      >
                        <select defaultValue={order.status}>
                          {orderStatus.map((status, idx) => (
                            <option value={idx + 1}>{status}</option>
                          ))}
                        </select>
                        <button type="button">UPDATE</button>
                      </form>
                    </div>
                  </div>
                  <div className="order-list-item-date">
                    placed by {order.username}
                  </div>
                  <div className="order-list-item-total">${order.total}</div>
                </div>
              ))
            : "No orders have been placed."}
        </div>
      </div>
    </div>
  );
}
