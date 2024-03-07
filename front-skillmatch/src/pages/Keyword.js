import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import GlobalStyle from "../components/GlobalStyles";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { PushableButtonStyled } from "../components/Noteadbutton";

export const Keyword = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [keyword, setKeyword] = useState({});

  useEffect(() => {
    fetchKeyword();
  }, [id]);

  const fetchKeyword = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/keywords/" + id
      );
      if (!response.ok) {
        throw new Error("Failed to fetch keyword");
      }
      const data = await response.json();
      console.log(data);
      setKeyword(data);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  return (
    <div>
      <GlobalStyle />
      <Navbar title={keyword.name} />
      <Container>
        
        <Skill>
          <Text>{keyword.name}</Text>
          <Text>{keyword.about}</Text>
          <Link to={`/tests/${keyword.name}`}>
            <PushableButtonStyled>take test</PushableButtonStyled>
          </Link>
        </Skill>
      </Container>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 10%;
`;

const Text = styled.div`
  font-size: xx-large;
  font-weight: bold;
  color: white;
  text-align: center;

`

const Skill = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 40vw;
  height: 30vh;
  background-color: #2c0735;
`;
