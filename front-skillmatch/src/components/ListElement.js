import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Offer = ({ title, ...props }) => {
  return (
    <StyledLink to={props.route}>
      <Container bgcolor={props.bgcolor} onClick={props.onClick}>
        {title ? <Title>{title}</Title> : <Title>Add</Title>}
      </Container>
    </StyledLink>
  );
};

export default Offer;

const Container = styled.div`
  background-color: ${(props) => props.bgcolor || "#6F00EF"} ;
  height: 20vh;
  overflow-y: hidden;
  flex: 0 0 calc(29% - 20px);
  margin-bottom: 20px;
  box-sizing: border-box; /* Include padding and border in the width */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5em;
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
  width: 200px; /* Set a fixed width for the title */
  white-space: nowrap; /* Prevent text from wrapping */
  overflow: hidden; /* Hide overflow */
  text-overflow: ellipsis; /* Display ellipsis (...) for overflow text */
  font-weight: bold;
  font-size: larger;
  text-align: center;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
`;
