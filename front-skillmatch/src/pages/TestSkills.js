import React from "react";
import GlobalStyle from "../components/GlobalStyles";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import QuestionsRectangle from "../components/QuestionsRectangle";
import AnswersSquare from "../components/AnswersSquare";

const TestSkills = () => {
  return (
    <div>
      <GlobalStyle></GlobalStyle>
      <Navbar backgroundColor="4E148C"></Navbar>
      <CoursesContainer>
        <Title>Hahahahahhaha progress bar goes here</Title>
        <Title>$COURSE_NAME Test</Title>
        <QuestionsRectangle></QuestionsRectangle>
        <AnswersContainer>
          <AnswersSquare></AnswersSquare>
          <AnswersSquare></AnswersSquare>
          <AnswersSquare></AnswersSquare>
        </AnswersContainer>
        <BotContainer></BotContainer>
      </CoursesContainer>
    </div>
  );
};

const Title = styled.div`
  color: #ffff;
  font-weight: bold;
  padding: 5px 5px;
  font-size: 30px;
  padding-left: 10px;
  margin-top: 20px;
`;

const CoursesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: wrap;
  gap: 20px;
  user-select: none;
`;

const AnswersContainer = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-evenly;
`;

const BotContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export default TestSkills;
