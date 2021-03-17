import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import ProductCard from "./ProductCard";
import "./ProductList.scss";
import { Productlist } from "../api/auth";
import loadingGif from "../../img/loading.gif";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { productId } = useParams();
  const { category } = useParams();

  const categoryProducts = category
    ? products.filter((product) => product.category === category)
    : "";

  const detailed = productId
    ? products.filter((product) => product.id === parseInt(productId, 10))
    : "";

  useEffect(() => {
    Productlist().then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  }, [productId, category]);

  return (
    <>
      {loading ? (
        <div
          className="loader-container"
          style={{
            position: "fixed",
            left: 0,
            alignItems: "flex-start",
            top: "1rem",
          }}
        >
          <img src={loadingGif} className="loader" />
        </div>
      ) : detailed ? (
        <ProductDetails products={detailed[0]} />
      ) : (
        <div className="">
          <ProductCard
            products={categoryProducts ? categoryProducts : products}
          />
        </div>
      )}
    </>
  );
};

export default ProductList;
