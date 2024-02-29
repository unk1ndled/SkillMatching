import React from "react";
import styled from "styled-components";
import { useState } from "react";

const AnswersSquare = ({ title, onSelect }) => {
  const [bgColor, setBgColor] = useState("#6f00ef");
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    // Change background color to a different color on click
    const newColor = bgColor === "#6f00ef" ? "#f7b538" : "#6f00ef";
    setBgColor(newColor);

    //select answer if not already selected
    setIsSelected(!isSelected);
    onSelect(title);
  };

  return (
    <Container onClick={handleClick} bgColor={bgColor}>
      {title ? <Title>{title}</Title> : <Title>Answer</Title>}
    </Container>
  );
};

export default AnswersSquare;

const Container = styled.div`
  background-color: ${(props) => props.bgColor};
  height: 20vh;
  flex: 0 0 calc(29% - 20px); /* Adjust as needed */
  margin-bottom: 20px; /* Add space between rows */
  box-sizing: border-box; /* Include padding and border in the width */
  display: flex;
  justify-content: center; /* Center the content horizontally */
  align-items: center; /* Center the content vertically */
  border-radius: 5%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5); /* Add drop shadow */
  &:hover {
    transform: scale(1.05); /* Increase size on hover */
    background-color: #f7b538; /* Change color when hovered over */
    transition: transform 0.3s ease; /* Smooth transition */
  }

  /* Click effect */
  &:active {
    transform: scale(0.95); /* Decrease size on click */

    transition: transform 0.1s ease; /* Smooth transition */
  }
`;

const Title = styled.text`
  color: #ffffff;
  font-weight: 700;
  font-size: larger;
  text-align: center;
`;
