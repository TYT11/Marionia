import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../items/ProductCard";
import "./Search.scss";
import CryingFace from "../../img/crying.gif";
import { Searchproduct } from "../api/auth";
import loadingGif from "../../img/loading.gif";
import "../items/ProductList.scss";

const Query = () => new URLSearchParams(useLocation().search);

const Search = () => {
  const [Results, setResults] = useState([]);
  const [Loading, setLoading] = useState(true);
  const location = useLocation().search;
  const query = Query();

  useEffect(() => {
    Searchproduct(query).then((res) => {
      setResults(res.data);
      setLoading(false);
    });
  }, [location]);

  return (
    <div className="result">
      {Loading ? (
        <div
          className="loader-container"
          style={{
            position: "fixed",
            left: "50%",
            transform: "translateX(-50%)",
            alignItems: "flex-start",
            top: "1rem",
            zIndex: "100",
          }}
        >
          <img src={loadingGif} className="loader" />
        </div>
      ) : Results.length > 0 ? (
        <>
          <div className="result-title">
            Your Search for <br />
            <span>&quot;{location.slice(3)}&quot;</span>
          </div>
          <div className="line result-line" />
          <div className="productList result-result">
            <ProductCard products={Results} />
          </div>
        </>
      ) : (
        <div className="result-none">
          <div className="result-none-img">
            <img src={CryingFace} />
          </div>
          <div className="result-none-title">
            NO MATCHES ARE FOUND
            <br />
            <span className="result-none-des">
              Please try out different key words.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
