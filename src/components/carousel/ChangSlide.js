import React from "react";
import styled from "styled-components";
import { ReactComponent as Next } from "../../img/svg/next.svg";
import { ReactComponent as Prev } from "../../img/svg/previous.svg";

const ChangeSlideStyled = styled.div`
  position: absolute;
  z-index: 1000;
  top: 50%;
  ${(props) => (props.direction === "left" ? "left:2%;" : "right:2%;")}
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const ChangeSlide = ({ direction, onClick }) => {
  return (
    <ChangeSlideStyled direction={direction}>
      {direction === "left" ? (
        <Prev onClick={onClick} direction={direction} />
      ) : (
        <Next onClick={onClick} direction={direction} />
      )}
    </ChangeSlideStyled>
  );
};

export default ChangeSlide;
