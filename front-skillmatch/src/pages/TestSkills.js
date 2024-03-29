import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import GlobalStyle from "../components/GlobalStyles";
import Navbar from "../components/Navbar";
import QuestionsRectangle from "../components/QuestionsRectangle";
import AnswersSquare from "../components/AnswerOption";
import AnswerButton from "../components/AnswerButton";
import TestResult from "../components/TestResult";

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
  const [passes, setPasses] = useState(false);
  const [questionOrderParam, setQuestionOrderParam] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [course, setCourse] = useState([]);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState("0%");
  const [reset, setReset] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [totalOfQuestions, setTotalOfQuestions] = useState(
    localStorage.getItem("totalOfQuestions") || 100
  );

  const location = useLocation();
  const { userData } = useAuth();

  const SERVER = process.env.REACT_APP_API_URL;

  useEffect(() => {
    setAboutParam(id);
  }, []);

  // console.log(userData);

  const id = location.pathname.split("/")[2];
  const isAdvanced = location.pathname.split("/")[4];

  // if (aboutParam !== undefined) {
  //   fetchData();
  // }

  useEffect(() => {
    // Fetch question data from  API
    if (aboutParam !== undefined) {
      axios
        .get(
          `${SERVER}api/v1/quizz/question?advanced=${isAdvanced}&about=${aboutParam}&questionOrder=${questionOrderParam}`
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

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${SERVER}api/v1/quizz/biggest-question-order?advanced=${isAdvanced}&about=${aboutParam}`
      );
      //console.log("response you got :" + response.data);
      setTotalOfQuestions(response.data);
      localStorage.setItem("totalOfQuestions", totalOfQuestions);

      //console.log("Question bigegst order data:", response.data);
    } catch (error) {
      console.error("Error fetching question data:", error);
    }
  };

  useEffect(() => {
    // Fetch data and store in LocalStorage
    fetchData();
  }, [totalOfQuestions]);

  const addSkillToUser = async () => {
    try {
      const kywdid = await axios.get(
        `${SERVER}api/v1/keywords/get-id?name=${aboutParam}`
      );

      const response = await fetch(
        `${SERVER}api/v1/profiles/${userData.id}/keywords/${kywdid.data}?advanced=${isAdvanced}`,
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
        handleCourse();
        addSkillToUser();
      } else {
        setShowResults(true);
      }
      localStorage.setItem("totalOfQuestions", 100);
    }
    //  reset state

    setReset(!reset);
    questionOrderParam < totalOfQuestions &&
      setQuestionOrderParam(questionOrderParam + 1);
  };
  useEffect(() => {
    if (passes) {
      setShowResults(true);
    }
  }, [passes, course]);

  const handleCourse = () => {
    setPasses(true);
    setCourse([aboutParam, isAdvanced]);
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

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("totalOfQuestions", 100);
    });
  }, []);

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
            bgcolor={"#4E148C"}
            hovercolor={"#858AE3"}
            clickcolor={"#2C0735"}
            textcolor={"white"}
            onClick={handleBack}
          >
            Back
          </AnswerButton>
          <AnswerButton
            bgcolor={"#4E148C"}
            hovercolor={"#858AE3"}
            clickcolor={"#2C0735"}
            textcolor={"white"}
            onClick={handleValidate}
          >
            Validate
          </AnswerButton>
        </BotContainer>
      </CoursesContainer>

      {showResults && (
        <TestResult score={score} course={course} passes={passes} />
      )}
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
