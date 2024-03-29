import React from "react";
import styled from "styled-components";
import { PushableButtonStyled } from "./Noteadbutton";
import { Link } from "react-router-dom";

const BlurWrapper = styled.div`
  background: rgba(0, 0, 0, 0.13);
  backdrop-filter: blur(9px);
  width: 100%;
  height: 100%;
  top: 0px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const ResultPopup = styled.div`
  height: 90px;
  width: 35%;
  background-color: #2c0735;
  padding: 20px;
  border: 1px solid black;
  border-bottom-left-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
`;

const ButtonSection = styled.div`
  height: 50px;
  width: 35%;
  background-color: #858ae3;
  padding: 20px;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
`;

const TestResult = ({ score, passes, course }) => {

  return (
    <BlurWrapper>
      {!passes ? (
        <ButtonSection>
          <Link to="/skills">
            <PushableButtonStyled>Close</PushableButtonStyled>
          </Link>
        </ButtonSection>
      ) : (
        <ButtonSection>
          <Link to= {`/tests/${course[0]}/advanced/${course[1]}/certificate`} >
            <PushableButtonStyled>get certificate</PushableButtonStyled>
          </Link>
        </ButtonSection>
      )}
      <ResultPopup>You score in this test is : {score}</ResultPopup>
    </BlurWrapper>
  );
};

export default TestResult;
