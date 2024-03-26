import React, { useState } from "react";
import GlobalStyle from "../components/GlobalStyles";
import Navbar from "../components/Navbar";
import QuestionForm from "../components/QuestionForm";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const AdminTestSkills = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState([]);
  const [advanced, setAdvanced] = useState(false);

  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate("/skills");
  };

  return (
    <div>
      <GlobalStyle />

      <Navbar title={"Admin Test Skills"} />
      <Container>
        <QuestionForm
          saveQuestion={(e) => setQuestion(e.target.textContent)}
          saveAnswers={(e) => setAnswer(e.target.textContent)}
          saveAdvanced={(e) => setAdvanced(e.target.textContent)}
          cancel={handleIconClick}
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
