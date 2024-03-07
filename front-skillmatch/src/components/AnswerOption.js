import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";

const AnswersSquare = ({ title, onSelect, reset }) => {
  const [bgColor, setBgColor] = useState("#6f00ef");
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    //select answer if not already selected
    setIsSelected(!isSelected);
    onSelect(title);

    // Change background color to a different color if its seleceted
    const newColor = isSelected ? "#6f00ef" : "#f7b538";
    setBgColor(newColor);
  };

  const resetState = () => {
    setIsSelected(false);
    setBgColor("#6f00ef");
  };

  useEffect(() => {
    resetState();
  }, [reset]);

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
  flex: 0 0 calc(29% - 20px);
  margin-bottom: 20px;
  box-sizing: border-box; /* Include padding and border in the width */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5); /* Add drop shadow */
  &:hover {
    transform: scale(1.05);
    background-color: #f7b538;
    transition: transform 0.3s ease; /* Smooth transition */
  }

  /* Click effect */
  &:active {
    transform: scale(0.95);

    transition: transform 0.1s ease;
  }
`;

const Title = styled.text`
  color: #ffffff;
  font-weight: 700;
  font-size: larger;
  text-align: center;
`;
