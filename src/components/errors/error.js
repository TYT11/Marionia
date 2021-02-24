import Reect from "react";
import "./error.scss";

const Error = () => {
  return (
    <div className="error">
      <img
        src="https://media.giphy.com/media/3o7aCTPPm4OHfRLSH6/giphy.gif"
        alt=""
      />
      <h3 className="error-message">OOPS! Something went wrong.</h3>
    </div>
  );
};

export default Error;
