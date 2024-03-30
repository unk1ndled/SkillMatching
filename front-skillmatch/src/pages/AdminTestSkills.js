import React, { useState } from "react";
import GlobalStyle from "../components/GlobalStyles";
import Navbar from "../components/Navbar";
import QuestionForm from "../components/QuestionForm";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const AdminTestSkills = () => {
  const [question, setQuestion] = useState();
  const [answers, setAnswers] = useState();
  const [firstAnswer, setFirstAnswer] = useState();
  const [secondAnswer, setSecondAnswer] = useState();
  const [thirdAnswer, setThirdAnswer] = useState();
  const [firstTF, setFirstTF] = useState(false);
  const [secondTF, setSecondTF] = useState(false);
  const [thirdTF, setThirdTF] = useState(false);
  const [send, setSend] = useState(false);

  const [advanced, setAdvanced] = useState();
  const [about, setAbout] = useState();

  const navigate = useNavigate();
  const SERVER = process.env.REACT_APP_API_URL;

  const handleBack = () => {
    navigate("/skills");
  };

  const location = useLocation();

  useEffect(() => {
    const updatedAnswers = {
      [firstAnswer]: firstTF,
      [secondAnswer]: secondTF,
      [thirdAnswer]: thirdTF,
    };
    setAnswers(updatedAnswers);
  }, [
    firstAnswer,
    secondAnswer,
    thirdAnswer,
    firstTF,
    secondTF,
    thirdTF,
    advanced,
  ]);

  useEffect(() => {
    const topic = String(location.pathname.split("/")[2]);
    setAbout(topic);
    // console.log(about);
  }, []);

  const handleAdvanced = (text) => {
    setAdvanced(text === "true");
  };

  const handleSendRequest = async () => {
    const requestBody = {
      question: question,
      answers: answers,
      advanced: advanced,
      about: about,
    };

    try {
      const response = await fetch(`${SERVER}api/v1/quizz/question`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setSend(false);
  };

  useEffect(() => {
    if (send === true) {
      handleSendRequest();
      window.location.reload();
    }
  }, [send]);

  return (
    <div>
      <GlobalStyle />

      <Navbar title={"Admin Test Skills"} />
      <Container>
        <QuestionForm
          saveQuestion={(e) => setQuestion(e.target.textContent)}
          savefirstanswer={(e) => setFirstAnswer(e.target.textContent)}
          savesecondanswer={(e) => setSecondAnswer(e.target.textContent)}
          savethirdanswer={(e) => setThirdAnswer(e.target.textContent)}
          savefirsttf={(e) => setFirstTF(true)}
          savesecondtf={(e) => setSecondTF(true)}
          savethirdtf={(e) => setThirdTF(true)}
          saveAdvanced={(e) => handleAdvanced(e.target.textContent)}
          submit={(e) => setSend(true)}
          cancel={handleBack}
        ></QuestionForm>
      </Container>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default AdminTestSkills;
