import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Keyword from "../components/ListElement";
import SkillForm from "../components/SkillForm";
import ListWrapper from "../components/ListWrapper";

const KeywordsDelete = () => {
  const [keywords, setKeywords] = useState([]);
  const [showNotepad, setShowNotepad] = useState(false);
  const [inputData, setInputData] = useState(null);
  const [name, SetName] = useState(null);
  const [about, SetAbout] = useState(null);

  const SERVER = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchKeywords();
  }, []);

  const handleIconClick = () => {
    setShowNotepad(!showNotepad);
  };

  const handleSendRequest = () => {
    const requestBody = {
      name: name,
      about: about,
    };

    fetch(`${SERVER}api/v1/keywords`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((responseData) => {})
      .catch((error) => {
        console.error(" hiiii Error:", error);
      });

    handleIconClick();
  };

  const deleteKeyword = (id) => {
    fetch(`${SERVER}api/v1/keywords/` + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // After successfully deleting a keyword, fetch the updated list of keywords
        fetchKeywords();
      })
      .catch((error) => {
        console.error("Error deleting keyword:", error);
      });
  };

  const fetchKeywords = async () => {
    try {
      const response = await fetch(`${SERVER}api/v1/keywords`);
      if (!response.ok) {
        throw new Error("Failed to fetch keywords");
      }
      const data = await response.json();
      setKeywords(data);
    } catch (error) {
      console.error("Error fetching keywords:", error);
    }
  };

  return (
    <Container>
      <Navbar backgroundColor="#B50000" title="Delete Keywords"></Navbar>
      <ButtonContainer>
        <Input type="text" placeholder="find keyword" />
        <HiddenButton type="submit">Search</HiddenButton>
      </ButtonContainer>
      <ListWrapper>
        {keywords.map((keyword, index) => (
          <Keyword
            bgcolor="#B50000"
            key={index}
            title={keyword.name}
            onClick={() => deleteKeyword(keyword.id)}
          ></Keyword>
        ))}
      </ListWrapper>

      {showNotepad && (
        <BlurWrapper>
          <SkillForm
            changeName={(e) => SetName(e.target.textContent)}
            changeAbout={(e) => SetAbout(e.target.textContent)}
            cancel={handleIconClick}
            submit={handleSendRequest}
          ></SkillForm>
        </BlurWrapper>
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: #4e148c;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  max-height: 100vh;
  overflow-y: auto;
`;

const BlurWrapper = styled.div`
  background: rgba(0, 0, 0, 0.13);
  backdrop-filter: blur(9px);
  width: 100%;
  height: 100%;
  top: 0px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

const ButtonContainer = styled.div`
  background-color: #4e148c;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 10vh;
`;

const Input = styled.input`
  display: flex;
  height: 70%;
  width: 600px;
  border: 2px solid #6f00ef;
  outline: none; /* Remove focus outline */
  background: rgba(1, 1, 1, 0.07);
  border-radius: 33px;
  font-size: 14px;
  font-weight: 700;
  color: white;
  font-family: "Nunito", sans-serif;
  text-align: center;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const HiddenButton = styled.button`
  display: none;
`;

export default KeywordsDelete;
