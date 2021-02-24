import React from "react";
import "./shipment.scss";
import Circle from "../../img/svg/circle.svg";
import FilledCircle from "../../img/svg/circle-fill.svg";

const IncreaseDay = (date, increaseBy) => {
  const today = new Date(date);
  const arrival = new Date();
  arrival.setDate(today.getDate() + increaseBy);
  return arrival.toLocaleDateString();
};

const estimatedArrival = (progress) => {
  switch (progress) {
    case 1:
      return `Estimated Arrival: ${IncreaseDay(Date.now(), 7)}`;
    case 2:
      return `Estimated Arrival: ${IncreaseDay(Date.now(), 3)}`;
    case 3:
      return "Delivered";
    default:
      return "Unclear status. Please contact customer service.";
  }
};

const Shipment = ({ progress }) => {
  console.log(progress);
  return (
    <div className="shipment-container">
      <div className="shipment">
        <div className="shipment-estimated">{estimatedArrival(progress)}</div>
        <div className="shipment-progress">
          <div className="shipment-progress-bar">
            <div className="shipment-progress-bar-fill">
              <img src={FilledCircle} alt="" className="fill-section" />
              <div className="fill-bar" style={{ backgroundColor: "green" }} />
              <img
                src={progress >= 2 ? FilledCircle : Circle}
                alt=""
                className="fill-section"
              />
              <div
                className="fill-bar"
                style={{ backgroundColor: progress >= 2 ? "green" : "" }}
              />
              <img
                src={progress == 3 ? FilledCircle : Circle}
                alt=""
                className="fill-section"
              />
            </div>
            <div className="shipment-progress-bar-text">
              <span className="status">Processing</span>
              <span className="status">Shipped</span>
              <span className="status">Delivered</span>
            </div>
          </div>
          <span className="shipment-progress-bar-info"> </span>
        </div>
      </div>
    </div>
  );
};

export default Shipment;
