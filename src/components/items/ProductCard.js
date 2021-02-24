import React from "react";
import styled from "styled-components";
import "./ProductCard.scss";
import { Link, Route, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const ProductImg = styled.div`
  overflow: hidden;
`;
const ProductInfo = styled.div``;
const ProductTitle = styled.div``;
const ProductSales = styled.div``;
const ProductSalesPrice = styled.span``;
const ProductSalesSold = styled.span``;

const ProductCard = ({ products }) => {
  const [sort, setSort] = useState(0);
  const [sorted, setSorted] = useState([]);

  const handleSort = () => {
    const productsCopy = [...products];
    const sorter = productsCopy.sort((a, b) => {
      return sort ? a.price - b.price : b.price - a.price;
    });
    setSorted(sorter);
    console.log("fired");
  };

  useEffect(() => {
    handleSort();
  }, [products, sort]);

  return (
    <>
      <div className="productsort">
        <label htmlFor="ProductSort">Sort By:</label>
        <select
          id="ProductSort"
          onChange={(e) => {
            setSort(parseInt(e.target.value, 10));
          }}
        >
          <option value="0">Price High to Low</option>
          <option value="1">Price Low to High</option>
        </select>
      </div>

      <div className="productList">
        {products
          ? sorted.map((product, index) => {
              return (
                <div className="productCard" key={index}>
                  <Link to={`/details/${product.id}`}>
                    <div className="productCard-inner">
                      <ProductImg className="productCard-inner-img">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/img/" +
                            product.img +
                            ".png"
                          }
                        ></img>
                      </ProductImg>
                      <ProductInfo className="productInfo">
                        <ProductTitle className="productInfo-title">
                          {product.title}
                        </ProductTitle>
                        <ProductSales className="productSales">
                          <ProductSalesPrice style={{ fontFamily: "Oswald" }}>
                            $ {product.price}
                          </ProductSalesPrice>
                          <ProductSalesSold>
                            {product.stock} left
                          </ProductSalesSold>
                        </ProductSales>
                      </ProductInfo>
                    </div>
                  </Link>
                </div>
              );
            })
          : "No Result"}
      </div>
    </>
  );
};

export default ProductCard;
