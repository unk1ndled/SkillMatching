import React from "react";
import styled from "styled-components";
import Paper from "./Paper";
import AnswerButton from "./AnswerButton";


const SkillForm = (props) => {
  return (
    <Container>
      <SkillElement>
        Name
        <Paper height="33px" onInput={props.changeName}></Paper>
      </SkillElement>
      <SkillElement>
        About
        <Paper height="15vw" onInput={props.changeAbout}></Paper>
      </SkillElement>
      <ButtonWrapper>
        <AnswerButton bgcolor="#2F2F2F" clickcolor="#F7B538" onClick={props.cancel}>
          CANCEL
        </AnswerButton>
        <AnswerButton bgcolor="#2F2F2F" clickcolor="#F7B538" onClick={props.submit}>
          SUBMIT
        </AnswerButton>
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 3%;
  margin-bottom: 3%;
  width: 80vw;
  background-color: #1c1c1c;
  border-radius: 10px 10px 0px 0px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 35px 20px 35px;
  box-sizing: border-box; /* Include padding and border in the width */
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
`;
const SkillElement = styled.div`
  width: ${(props) => props.width || "100%"};
  color: #f1ede9;
  font-weight: bold;
  font-size: 20px;
`;

export default SkillForm;
