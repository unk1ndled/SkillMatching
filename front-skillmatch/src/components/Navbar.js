import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../images/Logo.png";
import User from "../images/user.png";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = ({ title, backgroundColor }) => {
  const [showUserSection, setShowUserSection] = useState(false);

  const handleIconClick = () => {
    setShowUserSection(!showUserSection);
  };

  return (
    <Container backgroundColor={backgroundColor}>
      <Wrapper>
        <MiniWrapper>
          <StyledImg src={Logo} />
          <Title>{title}</Title>
        </MiniWrapper>
        <StyledIcon src={User} onClick={handleIconClick} />
        {showUserSection && (
          <UserSection>
            <Link to="/my-resume">
              <div>My Resumer</div>
            </Link>
            <Link to="/offers">
              <div>Job Offers</div>
            </Link>
            <Link to="/level-up">
              <div>Level Up</div>
            </Link>
            <Link to="/logout">
              <div>Log out</div>
            </Link>
          </UserSection>
        )}
      </Wrapper>
    </Container>
  );
};
export default Navbar;

const MiniWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const Container = styled.div`
  background-color: ${(props) => props.backgroundColor || "#4e148c"};
  height: 60px;
`;

const Title = styled.div`
  color: #ffff;
  font-weight: bold;
  padding: 5px 5px;
  font-size: 30px;
  padding-left: 10px;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledImg = styled.img`
  padding-left: 20px;
  max-height: 90%;
  width: auto;
`;
const StyledIcon = styled(StyledImg)`
  max-height: 50%;
  padding-right: 20px;
  padding-left: 0px;
`;

const UserSection = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  background-color: #6f00ef;
  border: 1px solid #cccccc;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  z-index: 1;
  border-bottom-left-radius: 70px; /* Adjust the value as needed */
  border-bottom-right-radius: 70px; /* Adjust the value as needed */
  div {
    margin-bottom: 10px;
    font-family: "Nunito", sans-serif;
    color: #ffff;
    font-weight: bold;
    padding: 5px;
    font-size: 20px;
    padding-left: 10px;
    margin-bottom: 15px;
    text-decoration: none;
    cursor: pointer;
  }
`;
