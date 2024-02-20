import React from "react";
import styled from "styled-components";
const OffersSquare = ({ title }) => {
  return (
    <Container>
      {title ? <Title>{title}</Title> : <Title>Offers</Title>}
    </Container>
  );
};

export default OffersSquare;

const Container = styled.div`
  background-color: #6f00ef;
  height: 25vh;
  flex: 0 0 calc(29% - 20px); /* Adjust as needed */
  margin-bottom: 20px; /* Add space between rows */
  box-sizing: border-box; /* Include padding and border in the width */
  display: flex;
  justify-content: center; /* Center the content horizontally */
  align-items: center; /* Center the content vertically */
  border-radius: 5%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Add drop shadow */
`;

const Title = styled.div`
  color: #ffffff;
  font-weight: bold;
  font-size: larger;
`;
