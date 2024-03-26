import GlobalStyle from "../components/GlobalStyles";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Add from "../images/add.svg";
import React, { useEffect, useState } from "react";
import { Notepad } from "../components/Notepad";
import { useNavigate } from "react-router-dom";
import ResultPopup from "../components/ResultPopup";
import ResumeForm from "../components/ResumeForm";
import ResponsePopup from "../components/ResponsePopup";

const AddResumer = () => {
  const navigate = useNavigate();
  const [showNotepad, setShowNotepad] = useState(false);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [objective, setObjective] = useState(null);
  const [skills, setSkills] = useState(null);
  const [history, setHistory] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [showResponse, setShowResponse] = useState(false);

  const handleSendRequest = () => {
    console.log(skills)
    fetch("http://localhost:8080/api/v1/keywords/analyse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: skills,
    })
      .then((response) => response.json())
      .then((responseData) => {
        // Handle the response data here
        setResponseData(responseData);
        console.log(responseData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    handleIconClick();
    showResponseDiv();
  };

  const handleIconClick = () => {
    setShowNotepad(!showNotepad);
  };

  //if (!localStorage.getItem('token')) {
  //return navigate("/login");
  useEffect(() => {
    {
      !localStorage.getItem("token") && navigate("/login", { replace: true });
    }
  }, []);
  //}

  const showResponseDiv = () => {
    setShowResponse(!showResponse);
  };

  return (
    <div>
      {!localStorage.getItem("token")}
      <GlobalStyle />
      <Navbar title="Resume" />
      <Center>
        <Text>Add your resume</Text>
        <StyledImg src={Add} onClick={handleIconClick} />
        <Text>Enter your experiences and competencies</Text>
      </Center>
      {showNotepad && (
        <BlurWrapper>
          <ResumeForm
            saveskills={(e) => setSkills(e.target.textContent)}
            saveobjective={(e) => setObjective(e.target.textContent)}
            savehistory={(e) => setHistory(e.target.textContent)}
            savefirstname={(e) => setFirstName(e.target.textContent)}
            savelastname={(e) => setLastName(e.target.textContent)}
            cancel={handleIconClick}
            submit={handleSendRequest}
          />
        </BlurWrapper>
      )}
      {showResponse && (
        <BlurWrapper>
          <ResponsePopup close = {showResponseDiv}></ResponsePopup>
        </BlurWrapper>
      )}
    </div>
  );
};
const BlurWrapper = styled.div`
  background: rgba(0, 0, 0, 0.13);
  backdrop-filter: blur(9px);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed; /* Fixed position to keep it fixed while scrolling */
  overflow-y: auto; /* Enable vertical scrolling if content exceeds viewport height */
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

const Text = styled.div`
  font-weight: bold;
  font-size: xx-large;
  color: white;
  margin: 20px 0px 20px 0px;
  text-align: center;
`;
const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  margin-top: 8%;
  height: 500px;
`;
const StyledImg = styled.img`
  max-height: 70%;
  width: auto;
  cursor: pointer;
`;

export default AddResumer;
