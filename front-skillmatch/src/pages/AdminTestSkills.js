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
  //Hall of Shame
  const [firstAnswer, setFirstAnswer] = useState();
  const [secondAnswer, setSecondAnswer] = useState();
  const [thirdAnswer, setThirdAnswer] = useState();
  const [firstTF, setFirstTF] = useState();
  const [secondTF, setSecondTF] = useState();
  const [thirdTF, setThirdTF] = useState();

  const [advanced, setAdvanced] = useState();
  const [about, setAbout] = useState();


  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/skills");
  };

  const location = useLocation();

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  useEffect(() => {
    const updatedAnswers = {
      [firstAnswer]: firstTF,
      [secondAnswer]: secondTF,
      [thirdAnswer]: thirdTF,
    };
    setAnswers(updatedAnswers);
  }, [advanced]);

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

    fetch(`http://localhost:8080/api/v1/quizz/question`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
          savefirsttf={(e) => setFirstTF(e.target.textContent)}
          savesecondtf={(e) => setSecondTF(e.target.textContent)}
          savethirdtf={(e) => setThirdTF(e.target.textContent)}
          saveAdvanced={(e) => handleAdvanced(e.target.textContent)}
          submit={handleSendRequest}
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
