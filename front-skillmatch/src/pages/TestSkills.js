import React from "react";
import { useState, useEffect } from "react";
import GlobalStyle from "../components/GlobalStyles";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import QuestionsRectangle from "../components/QuestionsRectangle";
import AnswersSquare from "../components/AnswersSquare";
import AnswerButton from "../components/AnswerButton";
import axios from "axios";

const TestSkills = () => {
  const [questionData, setQuestionData] = useState({
    id: "",
    question: "",
    question_order: 0,
    about: "",
    answers: {},
  });

  const [aboutParam, setAboutParam] = useState("java");
  const [questionOrderParam, setQuestionOrderParam] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState("0%"); // Initialize progress state
  const totalQuestions = 3;

  useEffect(() => {
    // Fetch question data from your API
    axios
      .get(
        `http://localhost:8081/api/v1/quizz/question?about=${aboutParam}&questionOrder=${questionOrderParam}`
      )
      .then((response) => {
        setQuestionData(response.data);
        //console.log("Question data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching question data:", error);
      });
    updateProgress();
    console.log("Score updated:", score);
    //console.log(questionData.question);
  }, [questionOrderParam, aboutParam, score]);

  const handleAnswerSelect = (selectedAnswer) => {
    // Check if the selected answer is already in the selectedAnswers array
    const index = selectedAnswers.indexOf(selectedAnswer);
    if (index === -1) {
      // If not, add it to the array
      setSelectedAnswers([...selectedAnswers, selectedAnswer]);
    } else {
      // If yes, remove it from the array
      const updatedAnswers = [...selectedAnswers];
      updatedAnswers.splice(index, 1);
      setSelectedAnswers(updatedAnswers);
    }
  };

  const handleValidate = () => {
    // Extract correct answers from questionData
    const correctAnswers = Object.entries(questionData.answers)
      .filter(([_, isCorrect]) => isCorrect === true)
      .map(([answer]) => answer);

    // Check if the selected answers match the correct answers
    const isCorrect = selectedAnswers.every((answer) =>
      correctAnswers.includes(answer)
    );
    // Display validation result
    if (isCorrect) {
      setScore((prevScore) => {
        const updatedScore = prevScore + 1;
        console.log("bravo your score=" + updatedScore);
        return updatedScore;
      });
    } else {
      //console.log("Please try again your score=" + score);
    }
    questionOrderParam < 3 && setQuestionOrderParam(questionOrderParam + 1);
  };

  const handleBack = () => {
    questionOrderParam > 1 && setQuestionOrderParam(questionOrderParam - 1);
    score > 0 && setScore(score - 1);
  };

  const updateProgress = () => {
    const calculatedProgress =
      ((questionOrderParam - 1) / totalQuestions) * 100;
    setProgress(`${calculatedProgress}%`);
  };

  return (
    <div>
      <GlobalStyle></GlobalStyle>
      <Navbar backgroundColor="4E148C"></Navbar>
      <CoursesContainer>
        <ProgressBarContainer>
          <ProgressIndicator progress={progress} />
        </ProgressBarContainer>
        <Title>This test is about {questionData.about}</Title>
        <QuestionsRectangle title={questionData.question}></QuestionsRectangle>
        <AnswersContainer>
          {Object.entries(questionData.answers).map(
            ([answer, isCorrect], index) => (
              <AnswersSquare
                key={index}
                title={answer}
                onSelect={handleAnswerSelect}
              />
            )
          )}
        </AnswersContainer>
        <BotContainer>
          <AnswerButton
            title={"Back"}
            bgcolor={"#d8572a"}
            onClick={handleBack}
          ></AnswerButton>
          <AnswerButton
            title={"Validate"}
            bgcolor={"#f7b538"}
            onClick={handleValidate}
          ></AnswerButton>
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
  margin-bottom: 10px;
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

const ProgressBarContainer = styled.div`
  width: 50%;
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  margin: 40px auto;
`;

const ProgressIndicator = styled.div`
  height: 100%;
  background-color: #f7b538;
  border-radius: 10px;
  width: ${(props) => props.progress}; /* Width based on the progress prop */
`;

export default TestSkills;
