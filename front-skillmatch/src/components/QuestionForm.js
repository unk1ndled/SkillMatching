import React from "react";
import styled from "styled-components";
import Paper from "./Paper";
import AnswerButton from "./AnswerButton";

const QuestionForm = (props) => {
  return (
    <Container>
      <ResumeElement>
        Question
        <Paper height="13vw" onInput={props.saveQuestion}></Paper>
      </ResumeElement>
      <VerticalSplit>
        <ResumeElement width="45%">
          Answer1
          <Paper height="33px" onInput={props.savefirstanswer}></Paper>
        </ResumeElement>
        <TrueElement width="45%">
          True
          <CheckboxInput type="checkbox" onChange={props.savefirsttf} />
        </TrueElement>
      </VerticalSplit>
      <VerticalSplit>
        <ResumeElement width="45%">
          Answer2
          <Paper height="33px" onInput={props.savesecondanswer}></Paper>
        </ResumeElement>
        <TrueElement width="45%">
          True
          <CheckboxInput type="checkbox" onChange={props.savesecondtf} />
        </TrueElement>
      </VerticalSplit>
      <VerticalSplit>
        <ResumeElement width="45%">
          Answer3
          <Paper height="33px" onInput={props.savethirdanswer}></Paper>
        </ResumeElement>
        <TrueElement width="45%">
          True
          <CheckboxInput type="checkbox" onChange={props.savethirdtf} />
        </TrueElement>
      </VerticalSplit>

      <VerticalSplit>
        <TrueElement width="45%">
          Advanced
          <CheckboxInput type="checkbox" onChange={props.saveAdvanced} />
        </TrueElement>
      </VerticalSplit>
      <ButtonWrapper>
        <AnswerButton
          bgcolor="#2F2F2F"
          clickcolor="#F7B538"
          onClick={props.cancel}
        >
          CANCEL
        </AnswerButton>
        <AnswerButton
          bgcolor="#2F2F2F"
          clickcolor="#F7B538"
          onClick={props.submit}
        >
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

const VerticalSplit = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const ResumeElement = styled.div`
  width: ${(props) => props.width || "100%"};
  color: #f1ede9;
  font-weight: bold;
  font-size: 20px;
`;

const TrueElement = styled.div`
  width: ${(props) => props.width || "100%"};
  color: #f1ede9;
  font-weight: bold;
  font-size: 20px;
  display: flex;
  align-items: center;
  margin-top: 20px;
`;
const CheckboxInput = styled.input`
  width: 20px;
  height: 20px;
  margin-left: 5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
`;

export default QuestionForm;
