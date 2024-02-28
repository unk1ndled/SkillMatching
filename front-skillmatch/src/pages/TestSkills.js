import React from "react";
import GlobalStyle from "../components/GlobalStyles";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import QuestionsRectangle from "../components/QuestionsRectangle";
import AnswersSquare from "../components/AnswersSquare";

const TestSkills = () => {
  const progress = "90%";
  return (
    <div>
      <GlobalStyle></GlobalStyle>
      <Navbar backgroundColor="4E148C"></Navbar>
      <CoursesContainer>
        <ProgressBarContainer>
          <ProgressIndicator progress={progress} />
        </ProgressBarContainer>
        <Title>$COURSE_NAME Test</Title>
        <QuestionsRectangle></QuestionsRectangle>
        <AnswersContainer>
          <AnswersSquare></AnswersSquare>
          <AnswersSquare></AnswersSquare>
          <AnswersSquare></AnswersSquare>
        </AnswersContainer>
        <BotContainer>
          <BackButton>Back</BackButton>
          <ValidateButton>Validate</ValidateButton>
        </BotContainer>
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
  width: 50%;
  height: 15vh;
  margin-top: 10px;
`;

const ValidateButton = styled.button`
  background-color: #f7b538;
  margin-top: 5px;
  height: 70%;
  width: 25%;
  border-radius: 10px;
  text-align: center;
  font-size: 1.9em;
  font-weight: 700;
  color: #2c0735;
  border-radius: 33px;
  border: none;
  border-bottom: solid #d8572a;
  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease; /* Smooth transition */
  }

  &:active {
    transform: scale(0.9); /* Decrease size on click */
    transition: transform 0.2s ease; /* Smooth transition */
  }
  @media screen and (max-width: 768px) {
    /* Adjust font size for smaller screens */
    font-size: 1em;
  }

  @media screen and (max-width: 480px) {
    /* Further adjust font size for extra small screens */
    font-size: 0.8em;
  }
`;

const BackButton = styled.button`
  background-color: #d8572a;
  margin-top: 5px;
  height: 70%;
  width: 25%;
  border-radius: 10px;
  text-align: center;
  font-size: 1.9em;
  font-weight: 700;
  color: #2c0735;
  border-radius: 33px;
  border: none;
  border-bottom: solid #f7b538;
  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease; /* Smooth transition */
  }

  &:active {
    transform: scale(0.9); /* Decrease size on click */
    transition: transform 0.2s ease; /* Smooth transition */
  }
  @media screen and (max-width: 768px) {
    /* Adjust font size for smaller screens */
    font-size: 1.5em;
  }

  @media screen and (max-width: 480px) {
    /* Further adjust font size for extra small screens */
    font-size: 1em;
  }
`;
const ProgressBarContainer = styled.div`
  width: 50%;
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  margin: 50px auto; /* Center the progress bar horizontally */
`;

const ProgressIndicator = styled.div`
  height: 100%;
  background-color: #f7b538;
  border-radius: 10px;
  width: ${(props) => props.progress}; /* Width based on the progress prop */
`;

export default TestSkills;
