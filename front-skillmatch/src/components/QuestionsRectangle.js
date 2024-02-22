import React from "react";
import styled from "styled-components";
const QuestionsRectangle = ({ title }) => {
  return (
    <Container>
      {title ? <Title>{title}</Title> : <Title> Questions go here ?</Title>}
    </Container>
  );
};

export default QuestionsRectangle;

const Container = styled.div`
  background-color: #6f00ef;
  height: 15vh;
  width: 75%;
  margin-bottom: 20px; /* Add space between rows */
  box-sizing: border-box; /* Include padding and border in the width */
  display: flex;
  justify-content: center; /* Center the content horizontally */
  align-items: center; /* Center the content vertically */
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5); /* Add drop shadow */
`;

const Title = styled.text`
  margin-top: 2%;
  color: #ffffff;
  font-weight: bold;
  font-size: 25px;
  text-align: center;
  height: 90%;
  width: 90%;
  white-space: normal; /* Allow text to wrap */
  word-wrap: break-word; /* Break long words if necessary */
`;
