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
      console.log(data);
      setOffer(data);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  return (
    <div>
      <Navbar title="Offer"></Navbar>
      <GlobalStyle />
      <Container>
        <Offere>
          <TitleWrap>
            <Title>{offer.title}</Title>
          </TitleWrap>
          <UpperWrap>
            <Image src={Icon}></Image>
            <UpperInnerText>
              Publiée le -/-/-
              <br />
              Employer : Tux
              <br />
              Date debut : -/-/-
              <br />
              Date fin : -/-/-
              <br />
              Description de l'entrepriseFondée en 2002, TECTRA est aujourd’hui la première entreprise de travail temporaire au Maroc.
              <br />
              Partagez cette annonce
              <br />
            </UpperInnerText>
            <Heart></Heart>
          </UpperWrap>
          <BottomWrap>
            Poste proposé : <br /> {offer.post}
            <br />
            <br />
            <br />
            Profil recherché pour le poste : <br /> {offer.profile}
          </BottomWrap>
        </Offere>
      </Container>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2%;
`;

const Offere = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vw;
  height: 85vh;
  background-color: #2c0735;
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
