import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProductDetails.scss";
import right from "../../img/svg/thin-right.svg";
import left from "../../img/svg/thin-left.svg";
import Success from "../../img/svg/success.svg";
import HelmetTemplate from "../helmetTemplate";

const ProductDetails = ({ products }) => {
  const ref = useRef(null);
  const ref2 = useRef(null);
  const [containerHeight, setContainerHeight] = useState();
  const [shown, setshown] = useState(false);
  const [selectedNum, setSelectedNum] = useState(1);
  const [recentlyPage, setRecentlyPage] = useState(0);
  const [recentlyViewed, setRecentlyViewd] = useState(false);
  const [recentlyViewedItems, setRecentlyViewedItems] = useState([]);
  const [addedAlert, setAddedAlert] = useState(false);

  const moveRecently = () => {
    const maxPage = Math.ceil(recentlyViewedItems.length / 5) - 1;
    if (recentlyPage <= maxPage) {
      ref2.current.style.transform = `translateX(${recentlyPage * -100}%)`;
    }
  };

  const handleLocalStorage = (key, state) => {
    const localParsed = JSON.parse(localStorage.getItem(key)) || [];
    const duplicateIndex = localParsed.findIndex(
      (item) => item.id === state.id
    );
    if (duplicateIndex !== -1) {
      localParsed.splice(duplicateIndex, 1);
    }
    localParsed.unshift({ id: state.id, title: state.title, img: state.img });
    localStorage.setItem(key, JSON.stringify(localParsed.slice(0, 10)));
  };

  const addToBag = (item) => {
    const savedBag = JSON.parse(localStorage.getItem("shopping")) || [];
    const alreadyExist = savedBag.find((product) => product.id === item.id);
    if (alreadyExist) {
      savedBag[savedBag.indexOf(alreadyExist)].qty = selectedNum;
    } else {
      savedBag.push({
        title: item.title,
        qty: selectedNum,
        price: item.price,
        img: item.img,
        id: item.id,
        stock: item.stock,
      });
    }
    localStorage.setItem("shopping", JSON.stringify(savedBag));

    setTimeout(() => {
      setAddedAlert(false);
    }, 1500);
  };

  useEffect(() => {
    const height = ref.current.scrollHeight;
    setContainerHeight(height);
    if (localStorage.getItem("recentlyViewed")) {
      setRecentlyViewd(true);
      setRecentlyViewedItems(
        JSON.parse(localStorage.getItem("recentlyViewed"))
      );
    }
  }, []);

  useEffect(() => {
    handleLocalStorage("recentlyViewed", products);
  }, []);

  useEffect(() => {
    moveRecently();
  }, [recentlyPage]);

  return (
    <>
      <HelmetTemplate
        subTitle={products.title}
        des={`More infomation on ${products.title}.`}
      />
      <div className={`addedalert ${addedAlert ? "alertactive" : ""}`}>
        <div className="alertactive-icon">
          <img src={Success} alt="" />
        </div>
        <div className="alertactive-message">
          <div className="alertactive-message-title">Success</div>
          <span className="alertactive-message-sub">
            You&#39;ve added the item in your cart.
          </span>
        </div>
      </div>

      <div className="pd-row-1">
        <div className="pd-row-1-left">
          <div className="pd-row-1-left-img">
            <picture>
              <source
                srcSet={`${process.env.PUBLIC_URL}/img/${products.img}.webp`}
              />
              <img
                src={`${process.env.PUBLIC_URL}/img/${products.img}.jpg`}
                alt={products.title}
              />
            </picture>
          </div>
        </div>
        <div className="pd-row-1-right">
          <div className="pd-row-1-right-title pd-top-s">{products.title}</div>
          <div className="pd-row-1-right-price  pd-top-s">
            NT$ {products.price * selectedNum}
          </div>
          <div
            className="pd-row-1-right-options  pd-top-s"
            onChange={() => {
              setSelectedNum(1);
            }}
          />
          <div className="pd-row-1-right-quantity">
            <select
              className="pd-row-1-right-quantity-dropdown mg-top-s"
              onChange={(e) => {
                setSelectedNum(e.target.value);
              }}
              value={selectedNum}
            >
              {[...Array(products.stock)].map((option, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="pd-row-1-right-buttons pd-top-s">
            <button
              className="buy"
              type="button"
              onClick={() => {
                addToBag(products);
                setAddedAlert(true);
              }}
            >
              ADD TO BAG
            </button>
          </div>
        </div>
      </div>
      <div className="pd-row-2">
        <div className="pd-row-2-details">
          <div className="pd-row-2-details-title title">DETAILS</div>

          <div className="pd-row-2-details-show">
            <input
              id="showmore"
              type="checkbox"
              className="showmore-checkbox"
            />

            <div className="showmore-mask" />

            <div
              className="detail"
              ref={ref}
              style={
                shown
                  ? { height: `${containerHeight}px` }
                  : { height: "1.5rem" }
              }
            >
              <div className="detail-p">
                {products.title} Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Quia, reprehenderit dolor fuga expedita,
                adipisci atque, velit quam rem sequi recusandae minima quis unde
                accusantium dolores numquam laboriosam obcaecati tempore
                voluptate? Lorem ipsum, dolor sit amet consectetur adipisicing
                elit. Ut magni quos ratione dolore eos enim vel temporibus
                asperiores repellendus quo. Mollitia id deserunt reiciendis.
                Soluta cumque modi ipsam dicta repudiandae?
              </div>
            </div>
            <label
              className="showmore"
              htmlFor="showmore"
              onClick={() => {
                setshown((prev) => !prev);
              }}
            >
              {shown ? "SHOW LESS" : "SHOW MORE"}
            </label>
          </div>
        </div>
      </div>
      <div className="pd-row-3">
        <div className="pd-row-3-also">
          <span className="line" />

          {recentlyViewed ? (
            <>
              <div className="title">RECENTLY VIEWED</div>
              <div className="recently">
                <button
                  className="previous"
                  type="button"
                  disabled={recentlyPage === 0 ? "true" : ""}
                  onClick={() => {
                    setRecentlyPage((prev) => prev - 1);
                  }}
                >
                  <img src={left} alt="" />
                </button>
                <div className="small-card-container" ref={ref2}>
                  {recentlyViewedItems.map((item, index) => (
                    <div className="small-card" key={index}>
                      <div className="small-card-img">
                        <Link to={`/details/${item.id}`}>
                          <picture>
                            <source
                              srcSet={`${process.env.PUBLIC_URL}/img/${item.img}.webp`}
                            />
                            <img
                              src={`${process.env.PUBLIC_URL}/img/${item.img}.jpg`}
                              alt={item.title}
                            />
                          </picture>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="next"
                  type="button"
                  disabled={
                    recentlyPage ===
                    Math.ceil(recentlyViewedItems.length / 5) - 1
                      ? "true"
                      : ""
                  }
                  onClick={() => {
                    setRecentlyPage((prev) => prev + 1);
                  }}
                >
                  <img src={right} alt="" />
                </button>
              </div>
            </>
          ) : (
            <div />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
