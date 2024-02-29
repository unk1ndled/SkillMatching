import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: ${(props) => props.bgcolor};
  margin-top: 5px;
  height: 70%;
  width: 25%;
  border-radius: 10px;
  text-align: center;
  font-size: 1.9em;
  font-weight: 700;
  color: #2c0735;
  border-radius: 33px;
  border: none;
  border-bottom: solid #d8572a;
  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease; /* Smooth transition */
  }

  &:active {
    transform: scale(0.9); /* Decrease size on click */
    transition: transform 0.2s ease; /* Smooth transition */
  }
  @media screen and (max-width: 768px) {
    font-size: 1.5em;
  }

  @media screen and (max-width: 480px) {
    font-size: 1em;
  }
`;
const AnswerButton = ({ title, bgcolor, onClick }) => {
  return (
    <Button bgcolor={bgcolor} onClick={onClick}>
      {title}
    </Button>
  );
};

export default AnswerButton;
