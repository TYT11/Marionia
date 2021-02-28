import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "./orderdetail.scss";
import Shipment from "./Shipment";
import { Orderdetail, Orderlist, Cancelorder } from "../api/auth";
import HelmetTemplate from "../helmetTemplate";

const Query = () => new URLSearchParams(useLocation().search);

const OrderDetail = () => {
  const [results, setResults] = useState([]);
  const [orders, setOrders] = useState("");
  const location = useLocation().search;
  const query = Query();
  const token = localStorage.getItem("token");
  const history = useHistory();

  useEffect(() => {
    Orderdetail(query, token)
      .then((res) => {
        setResults(res.data);
      })
      .catch((err) => console.log(err.response));
  }, [location]);

  useEffect(() => {
    Orderlist(token)
      .then((res) => {
        const order = res.data.filter((item) => item.order === query.get("n"));
        setOrders(order);
      })
      .catch((err) => console.log(err.response));
  }, []);

  const cancelOrder = () => {
    if (confirm("Do you want to cancel this order?")) {
      const order = query.get("n");
      Cancelorder(order, token)
        .then(() => {
          alert("Order Canceled!");
          history.replace("/order");
        })
        .catch((err) => console.log(err.response));
    } else {
      return;
    }
  };

  return (
    <div className="orderdetail-container">
      <HelmetTemplate subTitle="Order Details" des="Order Details">
        <meta name="robots" content="noindex, nofollow" />
      </HelmetTemplate>
      <div className="orderdetail-title">ORDER DETAILS</div>

      {results.length > 0 ? (
        <div className="orderdetail">
          {orders ? <Shipment progress={orders[0].status} /> : ""}
          <button
            className="orderdetail-cancel"
            type="submit"
            onClick={() => {
              cancelOrder();
            }}
          >
            CANCEL
          </button>
          <div className="orderdetail-list">
            {results.map((result, index) => (
              <div className="orderdetail-list-item" key={index}>
                <div>
                  <div className="orderdetail-list-item-title">
                    {result.item}
                  </div>
                  <div className="orderdetail-list-item-qty">x{result.qty}</div>
                </div>
                <div className="orderdetail-list-item-price">
                  <div>${result.qty * result.num}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="orderdetail-total">
            TOTAL: ${results.reduce((acc, cur) => acc + cur.qty * cur.num, 0)}
          </div>

          {orders ? (
            <div className="orderdetail-delivery">
              <div className="orderdetail-title">ADDRESS</div>
              <div className="orderdetail-delivery-info">
                <div className="orderdetail-delivery-info-box">
                  <span className="orderdetail-delivery-info-box-title">
                    Placed by:{" "}
                  </span>{" "}
                  {orders[0].name}
                </div>
                <div className="orderdetail-delivery-info-box">
                  <span className="orderdetail-delivery-info-box-title">
                    Phone:{" "}
                  </span>{" "}
                  {orders[0].phone}
                </div>
                <div className="orderdetail-delivery-info-box">
                  <span className="orderdetail-delivery-info-box-title">
                    Shipped to:{" "}
                  </span>{" "}
                  {orders[0].address}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        "No such order."
      )}
    </div>
  );
};

export default OrderDetail;
