import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ChangeSlide from "./ChangSlide";
import Dots from "./Dots";
import "./SliderContainer.scss";
import Mario1 from "../../img/mario-banner-1.jpg";
import Mario2 from "../../img/mario-banner-2.jpg";
import Mario3 from "../../img/mario-banner-3.jpg";
import Mario4 from "../../img/mario-banner-4.jpg";
const images = [Mario1, Mario2, Mario3, Mario4, Mario1, Mario2];

const Slide = styled.div`
  position: relative;
  z-index: 100;
  flex: 1;
  height: 100%;
  background-image: url(${(props) => props.img});
  background-position: center;
  background-size: cover;
`;

const SlideContainerStyled = styled.div`
  position: absolute;
  display: flex;
  width: calc(100% * ${images.length});
  height: 100%;
  transform: translateX(calc(${(props) => props.Shown} * -16.6666%));
  transition: all 0.5s;
`;

const SlideContainerInner = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
`;

const SlideContainer = () => {
  const [Shown, setShown] = useState(1);
  const [isAnimating, setisAnimating] = useState(false);
  const [ToggleFront, setToggleFront] = useState(false);
  const [ToggleBack, setToggleBack] = useState(false);
  const touch = {
    startX: 0,
    endX: 0,
    tocuhMove: false,
  };

  // auto slide every 5 seconds.
  // when button clicked halt for 5 seconds and continue auto slide

  let timeout;

  useEffect(() => {
    let isMounted = true;

    timeout = setInterval(() => {
      if (isMounted) {
        NextSlide();
      }
      clearInterval(timeout);
    }, 5000);

    return () => {
      isMounted = false;
    };
  }, [isAnimating]);

  const NextSlide = () => {
    // if sliding anamation is not activated
    if (!isAnimating) {
      setisAnimating(true);
      // when on last pic and users hit next
      if (Shown === images.length - 2) {
        // anaimation start
        setShown((prev) => prev + 1);
        // animation finished. jump back to the front.
        setTimeout(() => {
          setToggleFront(true);
          setShown(1);
          setisAnimating(false);
        }, 500);
        setToggleBack(false);
        return;
      }

      setToggleFront(false);
      setShown((prev) => prev + 1);
      setTimeout(() => {
        setisAnimating(false);
      }, 500);
    }
  };

  const PrevSlide = () => {
    if (!isAnimating) {
      setisAnimating(true);
      // when on first pic and users hit prev
      if (Shown === 1) {
        // anaimation start
        setShown((prev) => prev - 1);
        // animation finished. jump back to the front.
        setTimeout(() => {
          setToggleBack(true);
          setShown(images.length - 2);
          setisAnimating(false);
        }, 500);
        //clear class
        setToggleFront(false);
        return;
      }

      setToggleBack(false);
      setShown((prev) => prev - 1);
      setTimeout(() => {
        setisAnimating(false);
      }, 500);
    }
  };

  const handleTouchStart = (e) => {
    e.persist();
    touch.startX = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    e.persist();
    touch.endX = e.changedTouches[0].clientX;

    handleSwipe();
    touch.tocuhMove = false;
  };

  const handleTocuhMove = (e) => {
    touch.tocuhMove = true;
  };

  const handleSwipe = () => {
    if (touch.startX === touch.endX || !touch.tocuhMove) {
      return;
    } else if (touch.startX > touch.endX) {
      NextSlide();
    } else {
      PrevSlide();
    }
    touch.tocuhMove = false;
    touch.startX = 0;
    touch.endX = 0;
  };

  return (
    <>
      <SlideContainerInner
        onTouchStart={handleTouchStart}
        onTouchMove={handleTocuhMove}
        onTouchEnd={handleTouchEnd}
      >
        <SlideContainerStyled
          Shown={Shown}
          className={ToggleBack ? "toback" : ToggleFront ? "tofront" : ""}
        >
          {images.map((img, i) => (
            <Slide img={img} key={i} />
          ))}
        </SlideContainerStyled>
      </SlideContainerInner>

      <ChangeSlide
        direction="left"
        onClick={() => {
          clearTimeout(timeout);
          PrevSlide();
        }}
      />
      <ChangeSlide
        direction="right"
        onClick={() => {
          clearTimeout(timeout);
          NextSlide();
        }}
        className={ToggleFront ? "tofront" : ""}
      />
      <Dots
        total={images.length}
        Shown={Shown}
        setShown={setShown}
        setisAnimating={setisAnimating}
      />
    </>
  );
};

export default SlideContainer;
