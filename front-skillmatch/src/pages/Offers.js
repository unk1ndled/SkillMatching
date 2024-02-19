import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import OffersSquare from "../components/OffersSquare";
const Offers = () => {
  return (
    <Container>
      <Navbar></Navbar>
      <ButtonContainer>
        <Input type="text" placeholder="Search for Offers" />
        <HiddenButton type="submit">Search</HiddenButton>
      </ButtonContainer>

      <OffersWrapper></OffersWrapper>
    </Container>
  );
};

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
    color: #e5e5e5;
  }
`;

const HiddenButton = styled.button`
  display: none;
`;

const Container = styled.div`
  background-color: #4e148c;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden; /* Hide overflow content */
`;

const OffersWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px; /* Set maximum width as needed */
  margin: 0 auto; /* Center the wrapper horizontally */
  padding: 20px; /* Add some padding */
  background-color: white;
  height: 100vh;
`;

export default Offers;