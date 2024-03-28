import React from "react";
import Navbar from "../components/Navbar";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Icon from "../images/placeholder.jpg";

import GlobalStyle from "../components/GlobalStyles";
import styled from "styled-components";
import Heart from "../components/heartIcon";

export const Offer = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [offer, setOffer] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchOffer();
  }, [id]);

  const fetchOffer = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/offers/" + id);
      if (!response.ok) {
        throw new Error("Failed to fetch offer");
      }
      const data = await response.json();
      setOffer(data);
    } catch (error) {
      console.error("Error :", error);
    }

    if (offer.recognizedSkills == null) {
      const response = await fetch(
        "http://localhost:8080/api/v1/offers/" + id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  };

  return (
    <div>
      <Navbar title="Offer"></Navbar>
      <GlobalStyle />

      <Con>
        <Container>
          <Offere active={currentPage === 1}>
            <TitleWrap>
              <Title>{offer.title}</Title>
            </TitleWrap>
            <UpperWrap>
              <Image src={Icon}></Image>
              <UpperInnerText>
                Publiée le -/-/-
                <br />
                Employer : ---
                <br />
                Date debut : -/-/-
                <br />
                Date fin : -/-/-
                <br />
                Description de l'entrepriseFondée en 2002, TECTRA est
                aujourd'hui la première entreprise de travail temporaire au
                Maroc.
                <br />
                Partagez cette annonce
                <br />
              </UpperInnerText>
              <TriangleRight
                onClick={() => handlePageChange(2)}
              ></TriangleRight>
            </UpperWrap>
            <BottomWrap>
              Poste proposé : <br /> {offer.post}
              <br />
              <br />
              <br />
              Profil recherché pour le poste : <br /> {offer.profile}
            </BottomWrap>
          </Offere>

          <Offere active={currentPage === 2}>
            <UpperWrap>
              <TriangleLeft onClick={() => handlePageChange(1)}></TriangleLeft>
              <Title> skills you might need to get this offer </Title>

              <div></div>
              <div></div>
            </UpperWrap>
            <SkillSegment>
              {offer.recognizedSkills != null &&
                Object.entries(offer.recognizedSkills).map((keyword, index) => (
                  <StyledLink to ={`/skills/${keyword[1]}`}>
                    <Skill>
                      {/* iterate over each entry and show its first element which is the name  uwu tux comment */}
                      <SkillText> {keyword[0]}</SkillText>
                    </Skill>
                  </StyledLink>
                ))}
            </SkillSegment>
          </Offere>
        </Container>
      </Con>
    </div>
  );
};

const TriangleRight = styled.div`
  width: 0;
  height: 0;
  border-top: 4vw solid transparent; /* Adjust size as needed */
  border-bottom: 4vw solid transparent; /* Adjust size as needed */
  border-left: 5vw solid #2c0735; /* Adjust size and color as needed */

  &:hover {
    transform: scale(1.2);
    transition: transform 0.3s ease; /* Smooth transition */
    border-left-color: #97dffc;
    border-right-color: #97dffc;
  }

  /* Click effect */
  &:active {
    transform: scale(0.95);

    transition: transform 0.1s ease;
  }
`;

const TriangleLeft = styled(TriangleRight)`
  border-left: 0; /* Adjust size and color as needed */
  border-top: 3vw solid transparent; /* Adjust size as needed */
  border-bottom: 3vw solid transparent; /* Adjust size as needed */
  border-right: 4vw solid #2c0735; /* Adjust size and color as needed */
`;

const Con = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80vw;
  height: 85vh;
  position: relative;
  overflow: hidden;
  margin-top: 2%;
  background-color: #2c0735;
`;

const Offere = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #2c0735;
  position: absolute;
  top: 0;
  left: ${(props) => (props.active ? "0%" : "100%")};
  transition: left 0.3s ease;
`;

const Title = styled.div`
  color: #ffffff;
  width: 100%; /* Set a fixed width for the title */
  white-space: nowrap; /* Prevent text from wrapping */
  overflow: hidden; /* Hide overflow */
  text-overflow: ellipsis; /* Display ellipsis (...) for overflow text */
  font-weight: bold;
  font-size: 200%;
  text-align: center;
`;

const UpperInnerText = styled.div`
  color: white;
  height: 80%;
  width: 70%;

  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const Image = styled.img`
  height: 100%;
`;

const UpperWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  height: 30%;
  width: 100%;
  background-color: #4e148c;
  padding: 1%;
  gap: 3vw;
  box-sizing: border-box; /* Include padding and border in the width and height */
`;

const BottomWrap = styled.div`
  justify-content: center;
  align-items: center;
  height: 66%;
  width: 100%;
  padding: 2%;
  gap: 5vw;
  box-sizing: border-box; /* Include padding and border in the width and height */
  background-color: #2c0735;
  color: #858ae3;
  overflow: hidden;
  overflow-y: auto; /* Enable vertical scrolling when content overflows */

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TitleWrap = styled(BottomWrap)`
  height: 13%;
  background-color: #4e148c;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #613dc1;
  padding: 0%;
`;

const Segment = styled.div`
  position: relative;
  width: 100%;
  min-height: 20vh;

  color: #2c0735;
  font-weight: bold;
  height: auto;
  /* x-offset, y-offset, blur-radius, spread-radius, color */
  background-color: #4e148c;
  padding: 5px;
  box-sizing: border-box; /* Include padding and border in the width */
  word-wrap: break-word; /* or overflow-wrap: break-word; */
  overflow-y: auto;
  scrollbar-width: none;
`;

const SkillSegment = styled(Segment)`
  background-color: #2c0735;
  height: 100%;
  display: grid;
  padding: 3em;
  grid-template-columns: repeat(
    auto-fill,
    minmax(200px, 0.5fr)
  ); /* Adjust minmax values as needed */
  gap: 1vw;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  height: 5em;
`;

const Skill = styled.div`
  white-space: nowrap; /* Prevent text from wrapping */
  overflow: hidden; /* Hide overflow */
  text-overflow: ellipsis; /* Display ellipsis (...) for overflow text */
  color: #9896f2;
  background-color: #4e148c;
  height: 5em;
  display: flex;
  align-content: center;
  justify-content: center;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5);

  &:hover {
    transform: scale(1.05);
    background-color: #db7c26;
    color: black;
    transition: transform 0.3s ease;
  }
`;

const SkillText = styled.div`
  align-content: center;
  justify-content: center;
`;
