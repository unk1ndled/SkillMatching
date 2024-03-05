import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Offer = ({ title , ...props }) => {
  return (
    <Container>
      <Link to={props.route}>
        {title ? <Title>{title}</Title> : <Title>Add</Title>}
      </Link>
    </Container>
  );
};

export default Offer;

const Container = styled.div`
  background-color: #6f00ef;
  height: 25vh;
  flex: 0 0 calc(29% - 20px); /* Adjust as needed */
  margin-bottom: 20px; /* Add space between rows */
  box-sizing: border-box; /* Include padding and border in the width */
  display: flex;
  justify-content: center; /* Center the content horizontally */
  align-items: center; /* Center the content vertically */
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Add drop shadow */

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

const Title = styled.div`
  color: #ffffff;
  font-weight: bold;
  font-size: larger;
`;
