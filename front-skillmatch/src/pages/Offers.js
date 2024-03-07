import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Offer from "../components/OffersElement";
import { Link } from "react-router-dom";

const Offers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/offers");
      if (!response.ok) {
        throw new Error("Failed to fetch offers");
      }
      const data = await response.json();
      console.log(data)
      setOffers(data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  return (
    <Container>
      <Navbar title="Offers"></Navbar>
      <ButtonContainer>
        <Input type="text" placeholder="Search for Offers" />
        <HiddenButton type="submit">Search</HiddenButton>
      </ButtonContainer>
      <OffersWrapper>
        <Offer route="/newoffer"></Offer>
        {offers.map((offer, index) => (
                    <Offer key={index} title ={offer.title}>
                        
                    </Offer>
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
  justify-content: center; /* Center items horizontally */
  align-items: flex-start; /* Align items to the top */
  height: 10vh; /* Set height to full viewport height */
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

export default Offers;
