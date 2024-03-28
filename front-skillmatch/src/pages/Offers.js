import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Offer from "../components/ListElement";
import { Notepad } from "../components/Notepad";
import ListWrapper from "../components/ListWrapper";
import { useAuth } from "../context/AuthContext";

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [showNotepad, setShowNotepad] = useState(false);
  const [inputData, setInputData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleIconClick = () => {
    setShowNotepad(!showNotepad);
  };

  const handleSendRequest = () => {
    fetch("http://localhost:8080/api/v1/offers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: inputData,
    })
      .then((response) => response.json())
      .then((responseData) => {
        // Handle the response data here
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    handleIconClick();
  };


  const filteredOffers = offers.filter((offer) =>
  offer.title?.toLowerCase().includes(searchQuery.toLowerCase())
);


  console.log(filteredOffers)

  const fetchOffers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/offers");
      if (!response.ok) {
        throw new Error("Failed to fetch offers");
      }
      const data = await response.json();
      console.log(data);
      setOffers(data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  const { userData } = useAuth();
  const isAdmin = userData && userData.role === "ADMIN";

  return (
    <Container>
      <Navbar title="Offers"></Navbar>
      <ButtonContainer>
        <Input
          type="text"
          placeholder="Search for Offers"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <HiddenButton type="submit">Search</HiddenButton>
      </ButtonContainer>
      {/*<p>User data: {JSON.stringify(userData)}</p>*/}
      <ListWrapper>
        {isAdmin && <Offer bgcolor="#DB7C26" onClick={handleIconClick}></Offer>}
        {offers.map((offer, index) => (
          <Offer
            route={`/offers/${offer.id}`}
            key={index}
            title={offer.title}
          ></Offer>
        ))}
      </ListWrapper>
      {showNotepad && (
        <BlurWrapper>
          <Notepad
            height="20px"
            changeText={(e) => setInputData(e.target.textContent)}
            close={handleIconClick}
            submit={handleSendRequest}
          />
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

const HiddenButton = styled.button`
  display: none;
`;

export default Offers;
