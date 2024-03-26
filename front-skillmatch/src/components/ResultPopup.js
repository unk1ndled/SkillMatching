import React from "react";
import styled from "styled-components";
import { PushableButton, PushableButtonStyled } from "./Noteadbutton";

const ResultPopup = ({ children, ...props }) => {
  return (
    <Container>
      <Upper>
        <PushableButtonStyled onClick={props.close}>close</PushableButtonStyled>
      </Upper>
      <Padding>
        <ResWrapper>
          {props.data.map((item) => (
            <Skill>{item}</Skill>
          ))}
        </ResWrapper>
      </Padding>
    </Container>
  );
};

const Icon = styled.img`
  max-height: 100%;
  width: auto;
`;

const Skill = styled.div`
  padding: 10px 40px 10px 40px;
  background-color: #4e148c;
  text-align: center;
  border-radius: 10px 10px 10px 10px;
  font-weight: bold;
  font-size: larger;
  color: white;
`;

const Container = styled.div`
  width: 60%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #858ae3;
  margin-top: 5%;
  border-radius: 20px;
  padding: 20px;
  gap: 10px;
`;

const Padding = styled.div`
  width: 100%;
  height: 70%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2c0735;
`;

const Upper = styled(Padding)`
  height: 30%;
  display: flex;
  padding: 10px;
`;

const ResWrapper = styled.div`
  z-index: 1;
  width: 95%;
  height: 90%;
  background-color: #2c0735;
  border-radius: 10px;
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 10%;

  justify-content: center;
  align-items: center;

  overflow: hidden;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default ResultPopup;
