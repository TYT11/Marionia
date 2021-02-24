import React from "react";
import styled from "styled-components";
import SlideContainer from "./SlideContainer";

const CarouselStyled = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  overflow: hidden;
`;

const Carousel = () => {
  return (
    <CarouselStyled>
      <SlideContainer />
    </CarouselStyled>
  );
};

export default Carousel;
