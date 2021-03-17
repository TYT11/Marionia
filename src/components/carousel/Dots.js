import React from "react";
import styled from "styled-components";
import "./Dots.scss";

const DotsStyled = styled.div`
  display: flex;
  justify-content: space-around;
  position: absolute;
  width: 40%;
  left: 50%;
  bottom: 2%;
  transform: translateX(-50%);
`;
const DotStyled = styled.ul`
  display: flex;
  list-style: none;

  li {
    width: 0.7rem;
    height: 0.7rem;
    margin: 0 5px;
    border-radius: 50%;
    background-color: #eee;
    opacity: 0.8;
  }

  li {
    background-color: #eee;
    transition: all 0.2s;
  }
`;

const Dots = ({ total, Shown, setShown, setisAnimating }) => {
  return (
    <DotsStyled>
      <DotStyled>
        {[...Array(total - 2)].map((el, ind) => {
          return (
            <li
              key={ind + 1}
              onClick={() => {
                setShown(ind + 1);
                setisAnimating(true);
                setTimeout(() => {
                  setisAnimating(false);
                }, 500);
              }}
              className={Shown === ind + 1 ? "Circle-active" : ""}
            ></li>
          );
        })}
      </DotStyled>
    </DotsStyled>
  );
};

export default Dots;
