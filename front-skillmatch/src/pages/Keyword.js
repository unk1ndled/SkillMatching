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
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [showDifficulty, setShowDiffculty] = useState(false);

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

  const HandleShowDifficulty = () => {
    setShowDiffculty(!showDifficulty);
  };

  const CheckAdvanced = (text) => {
    console.log(text);
    setIsAdvanced(text === "advanced");
    console.log("advanced is " + isAdvanced);
    HandleShowDifficulty();
  };
  //TODO : Problem with isAdvanced checking

  return (
    <div>
      <GlobalStyle />
      <Navbar title={keyword.name} />
      <Container>
        <Skill>
          <UpperWrap>
            <Image src={Icon} />
            <TitleText>{keyword.name}</TitleText>

            <TriangleRight onClick={HandleShowDifficulty}></TriangleRight>
          </UpperWrap>
          <BottomWrap>
            about this skill <br /> <br /> {keyword.about}
          </BottomWrap>
        </Skill>
      </Container>
      {showDifficulty && (
        <BlurWrapper>
          <ButtonSection>
            <PushableButtonStyled onClick={HandleShowDifficulty}>
              Close
            </PushableButtonStyled>
          </ButtonSection>
          <ResultPopup>
            <StyledLink to={`/tests/${keyword.name}/advanced/${isAdvanced}`}>
              <Difficulty onClick={(e) => CheckAdvanced(e.target.textContent)}>
                easy
              </Difficulty>
            </StyledLink>
            <StyledLink to={`/tests/${keyword.name}/advanced/true`}>
              <Difficulty onClick={(e) => CheckAdvanced(e.target.textContent)}>
                advanced
              </Difficulty>
            </StyledLink>
            <StyledLink to={`/tests/${keyword.name}/add`}>
              <Difficulty>Admin section</Difficulty>
            </StyledLink>
          </ResultPopup>
        </BlurWrapper>
      )}
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
    border-left-color: #97dffc;
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
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  height: 60%;
  width: 100%;
  background-color: #4e148c;
  padding: 2%;
  gap: 5vw;
  box-sizing: border-box;
`;
const BottomWrap = styled.div`
  justify-content: center;
  align-items: center;
  height: 40%;
  width: 100%;
  padding: 2%;
  gap: 5vw;
  box-sizing: border-box;
  color: #858ae3;
  overflow: hidden;
`;
const TitleText = styled.div`
  font-size: 6dvw;
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
  justify-content: center;
  z-index: 1;
  user-select: none;
`;
const ResultPopup = styled.div`
  height: 300px;
  width: 35%;
  background-color: #2c0735;
  padding: 20px;
  border: 1px solid black;
  border-bottom-left-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
  color: white;
  font-size: 2rem;
`;

const ButtonSection = styled.div`
  height: 50px;
  width: 35%;
  background-color: #858ae3;
  padding: 20px;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
`;

const Difficulty = styled.div`
  background-color: #858ae3;
  width: 25vw;
  height: 7vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  font-size: 2rem;
  font-weight: bold;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
    background: #f7b538;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
