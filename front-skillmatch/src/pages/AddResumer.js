import GlobalStyle from "../components/GlobalStyles";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Add from "../images/add.svg";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResumeForm from "../components/ResumeForm";
import ResponsePopup from "../components/ResponsePopup";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const AddResumer = () => {
  const navigate = useNavigate();
  const [showNotepad, setShowNotepad] = useState(false);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [objective, setObjective] = useState(null);
  const [skills, setSkills] = useState(null);
  const [experience, setExperience] = useState([]);
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(null);
  const [summary, setSummary] = useState(null);

  const [responseData, setResponseData] = useState(null);
  const [showResponse, setShowResponse] = useState(false);

  const { userData } = useAuth();

  ////////////////////////////////
  const sendProfile = async () => {
    const personalInfo = JSON.stringify({
      address: address,
      email: email,
      phone: phone,
    });

    const requestBody = {
      profile: {
        firstName: firstName,
        lastName: lastName,
        experience: experience,
        objective: objective,
        skills: skills,
        recognizedSkills: null,
        personalInfo: personalInfo,
      },
      email: userData.sub,
    };

    await console.log(requestBody);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/profiles",
        requestBody
      );
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  /////////////////////////////

  const handleIconClick = () => {
    setShowNotepad(!showNotepad);
    const personalInfo = JSON.stringify({
      address: address,
      email: email,
      phone: phone,
    });
    console.log(personalInfo);
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
            saveadress={(e) => setAddress(e.target.textContent)}
            saveemail={(e) => setEmail(e.target.textContent)}
            savephone={(e) => setPhone(e.target.textContent)}
            savesummary={(e) => setSummary(e.target.textContent)}
            saveskills={(e) => setSkills(e.target.textContent)}
            saveobjective={(e) => setObjective(e.target.textContent)}
            saveExperience={(e) => setExperience(e)}
            savefirstname={(e) => setFirstName(e.target.textContent)}
            savelastname={(e) => setLastName(e.target.textContent)}
            cancel={handleIconClick}
            submit={sendProfile}
          />
        </BlurWrapper>
      )}
      {showResponse && (
        <BlurWrapper>
          <ResponsePopup close={showResponseDiv}></ResponsePopup>
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
