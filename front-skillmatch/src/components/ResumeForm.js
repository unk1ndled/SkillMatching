import React from "react";
import styled from "styled-components";
import Paper from "./Paper";
import AnswerButton from "./AnswerButton";

const ResumeForm = (props) => {
  return (
    <Container>
      <VerticalSplit>
        <ResumeElement width="45%">
          FIRST NAME
          <Paper height="33px" onInput={props.savefirstname}></Paper>
        </ResumeElement>
        <ResumeElement width="45%">
          LAST NAME
          <Paper height="33px" onInput={props.savelastname}></Paper>
        </ResumeElement>
      </VerticalSplit>

      <ResumeElement>
        CAREER OBJECTIVE
        <Paper height="15vw" onInput={props.saveobjective}></Paper>
      </ResumeElement>

      <ResumeElement>
        PROFESSIONAL SKILLS
        <Paper height="15vw" onInput={props.saveskills}></Paper>
      </ResumeElement>

      <ResumeElement>
        WORK HISTORY
        <Paper height="15vw" onInput={props.savehistory}> </Paper>
      </ResumeElement>

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
  background-color: #1C1C1C;
  border-radius: 10px 10px 0px 0px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 35px 20px 35px;
  box-sizing: border-box; /* Include padding and border in the width */
`;
const VerticalSplit = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
`;
const ResumeElement = styled.div`
  width: ${(props) => props.width || "100%"};
  color: #f1ede9;
  font-weight: bold;
  font-size: 20px;
`;

export default ResumeForm;
