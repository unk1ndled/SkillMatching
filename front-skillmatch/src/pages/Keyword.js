import React from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../images/placeholder.jpg";

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
          <UpperWrap>
            <Image src={Icon} />

            <TitleText>{keyword.name}</TitleText>
            <Link to={`/tests/${keyword.name}`}>
              <TriangleRight></TriangleRight>
            </Link>
          </UpperWrap>
          <BottomWrap>
            about this skill <br /> <br /> {keyword.about}
          </BottomWrap>
        </Skill>
      </Container>
    </div>
  );
};

const TriangleRight = styled.div`
  width: 0;
  height: 0;
  border-top: 5vw solid transparent; /* Adjust size as needed */
  border-bottom: 5vw solid transparent; /* Adjust size as needed */
  border-left: 7vw solid #2c0735; /* Adjust size and color as needed */

  &:hover {
    transform: scale(1.2);
    transition: transform 0.3s ease; /* Smooth transition */
    border-left-color : #97DFFC;
  }

  /* Click effect */
  &:active {
    transform: scale(0.95);

    transition: transform 0.1s ease;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 5%;
`;

const UpperWrap = styled.div`
  display: flex;
  align-items: center;

  height: 60%;
  width: 100%;
  background-color: #4e148c;
  padding: 2%;
  gap: 5vw;
  box-sizing: border-box; /* Include padding and border in the width and height */
`;
const BottomWrap = styled.div`
  justify-content: center;
  align-items: center;
  height: 40%;
  width: 100%;
  padding: 2%;
  gap: 5vw;
  box-sizing: border-box; /* Include padding and border in the width and height */
  color: #858ae3;
`;

const TitleText = styled.div`
  font-size: 20vh;
  font-weight: bold;
  color: white;
  text-align: center;
`;

const Image = styled.img`
  height: 90%;
`;

const Skill = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60vw;
  height: 70vh;
  background-color: #2c0735;
`;
