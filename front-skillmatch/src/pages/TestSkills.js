import React from "react";
import { useState, useEffect } from "react";
import GlobalStyle from "../components/GlobalStyles";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import QuestionsRectangle from "../components/QuestionsRectangle";
import AnswersSquare from "../components/AnswerOption";
import AnswerButton from "../components/AnswerButton";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

import TestResult from "../components/TestResult";
import { useLocation } from "react-router-dom";

const TestSkills = () => {
  const [questionData, setQuestionData] = useState({
    id: "",
    question: "",
    question_order: 0,
    about: "",
    answers: {},
    advanced: false,
  });

  const [aboutParam, setAboutParam] = useState();
  const [advanced, setAdvanced] = useState(false);
  const [questionOrderParam, setQuestionOrderParam] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState("0%");
  const [reset, setReset] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [keywordId, setKeywordId] = useState(
    localStorage.getItem("keywordId") || ""
  );
  const [totalOfQuestions, setTotalOfQuestions] = useState(100);

  const location = useLocation();
  const { userData } = useAuth();

  // console.log(userData);

  const id = location.pathname.split("/")[2];
  const isAdvanced = location.pathname.split("/")[4];

  useEffect(() => {
    setAboutParam(id);
    setAdvanced(isAdvanced);
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/quizz/biggest-question-order?advanced=${isAdvanced}&about=${aboutParam}`
      );
      //console.log("response you got :" + response.data);
      setTotalOfQuestions(response.data);
      localStorage.setItem("keywordId", totalOfQuestions);

      //console.log("Question bigegst order data:", response.data);
    } catch (error) {
      console.error("Error fetching question data:", error);
    }
  };

  if (aboutParam !== undefined) {
    fetchData();
  }

  useEffect(() => {
    const fetchKeywordId = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/keywords/get-id?name=${aboutParam}`
        );
        setKeywordId(response.data);
        localStorage.setItem("keywordId", keywordId);
        //console.log("Keyword Id", keywordId);
        //console.log("Keyword Id", response.data);
      } catch (error) {
        console.error("Error fetching keyword ID:", error);
      }
    };
  }, [aboutParam]);

  useEffect(() => {
    // Fetch question data from  API
    if (aboutParam !== undefined) {
      axios
        .get(
          `http://localhost:8080/api/v1/quizz/question?advanced=${isAdvanced}&about=${aboutParam}&questionOrder=${questionOrderParam}`
        )
        .then((response) => {
          setQuestionData(response.data);
          // console.log("Question data:", response.data);
        })
        .catch((error) => {
          console.error("Error fetching question data:", error);
        });
    }
    updateProgress();
  }, [questionOrderParam, aboutParam]);

  const addSkillToUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/profiles/${userData.id}/keywords/${keywordId}?advanced=${isAdvanced}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to add skill. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error adding skill:", error.message);
    }

    console.log("Meeebrouk nj7ti");
  };

  const handleAnswerSelect = (selectedAnswer) => {
    // Toggle the selected answer
    const updatedAnswers = selectedAnswers.includes(selectedAnswer)
      ? selectedAnswers.filter((answer) => answer !== selectedAnswer)
      : [...selectedAnswers, selectedAnswer];
    setSelectedAnswers(updatedAnswers);
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

    // Validate thes score
    if (isCorrect && selectedAnswers.length > 0) {
      score < totalOfQuestions && setScore(score + 1);
    } else {
    }
    // Reset selected answers and go to next question
    setSelectedAnswers([]);
    if (progress === "100%") {
      if (score + 1 === totalOfQuestions) {
        addSkillToUser();
      }
      setShowResults(true);
    }
    //  reset state

    setReset(!reset);
    questionOrderParam < totalOfQuestions &&
      setQuestionOrderParam(questionOrderParam + 1);
  };

  const handleBack = () => {
    questionOrderParam > 1 && setQuestionOrderParam(questionOrderParam - 1);
    //set score to minus-1 when back
    score > 0 && setScore(score - 1);
    setSelectedAnswers([]);
  };

  const updateProgress = () => {
    const calculatedProgress = (questionOrderParam / totalOfQuestions) * 100;
    setProgress(`${calculatedProgress}%`);
    //console.log(progress);
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
          {questionData.answers &&
            Object.entries(questionData.answers).map(
              ([answer, isCorrect], index) => (
                <AnswersSquare
                  key={index}
                  title={answer}
                  onSelect={handleAnswerSelect}
                  reset={reset}
                />
              )
            )}
        </AnswersContainer>
        <BotContainer>
          <AnswerButton
            bgcolor={"#858AE3"}
            hovercolor={"#858AE3"}
            clickcolor={"#613DC1"}
            onClick={handleBack}
          >
            Back
          </AnswerButton>
          <AnswerButton
            bgcolor={"#97DFFC"}
            hovercolor={"#858AE3"}
            clickcolor={"#613DC1"}
            onClick={handleValidate}
          >
            Validate
          </AnswerButton>
        </BotContainer>
      </CoursesContainer>

      {showResults && <TestResult score={score} />}
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
