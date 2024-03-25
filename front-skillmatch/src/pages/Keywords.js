import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Keyword from "../components/OffersElement";

const Keywords = () => {
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    fetchKeywords();
  }, []);

  const fetchKeywords = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/keywords");
      if (!response.ok) {
        throw new Error("Failed to fetch keywords");
      }
      const data = await response.json();
      console.log(data);
      setKeywords(data);
    } catch (error) {
      console.error("Error fetching keywords:", error);
    }
  };

  return (
    <Container>
      <Navbar title="Keywords"></Navbar>
      <ButtonContainer>
        <Input type="text" placeholder="find keyword" />
        <HiddenButton type="submit">Search</HiddenButton>
      </ButtonContainer>
      <OffersWrapper>
        <Keyword route="/"></Keyword>
        {keywords.map((keyword, index) => (
          <Keyword
            route={`/skills/${keyword.id}`}
            key={index}
            title={keyword.name}
          ></Keyword>
        ))}
      </OffersWrapper>
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

const ButtonContainer = styled.div`
  background-color: #4e148c;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 10vh;
`;

const Input = styled.input`
  display: flex;
  height: 50px;
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

const OffersWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  max-height: 70vh; /* Limit the height of the wrapper to the viewport height */
  overflow-y: auto; /* Enable vertical scrolling when content overflows */

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Keywords;
