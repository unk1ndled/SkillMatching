import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: ${(props) => props.bgcolor};
  margin-top: 5px;
  height: 70px;
  width: 25%;
  border-radius: 10px;
  text-align: center;
  font-size: 1.5em;
  font-weight: 600;
  color:${(props) => props.textcolor || "#9A9A9A"} ;
  border-radius: 5px;
  border: none;
  &:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease; /* Smooth transition */
  }

  &:active {
    transform: scale(0.9); /* Decrease size on click */
    background-color: ${(props) => props.clickcolor };
    transition: transform 0.2s ease; /* Smooth transition */
  }
  @media screen and (max-width: 768px) {
    font-size: 1.5em;
  }

  @media screen and (max-width: 480px) {
    font-size: 1em;
  }
`;
const AnswerButton = ({ children,clickcolor, bgcolor, onClick, textcolor }) => {
  return (
    <Button bgcolor={bgcolor} clickcolor={clickcolor} onClick={onClick} textcolor={textcolor}>
      {children}
    </Button>
  );
};

export default AnswerButton;
