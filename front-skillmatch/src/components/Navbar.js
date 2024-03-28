import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../images/Logo.png";
import User from "../images/user.png";
import { Link } from "react-router-dom";
import { useAuthNavigate } from "../context/useAuthNavigate";

const Navbar = ({ title, backgroundColor }) => {
  const [showUserSection, setShowUserSection] = useState(false);

  const handleIconClick = () => {
    setShowUserSection(!showUserSection);
  };

  const { logout } = useAuthNavigate();

  return (
    <Container backgroundColor={backgroundColor}>
      <Wrapper>
        <MiniWrapper>
          <StyledImg src={Logo} />
          <StyledLink to="/">
            <Title>{title}</Title>
          </StyledLink>
        </MiniWrapper>
        <MarginRightWrapper>
          <StyledIcon src={User} onClick={handleIconClick} />
        </MarginRightWrapper>
        {showUserSection && (
          <UserSection>
            <ShrinkerWrapper>
              <StyledIcon src={User} onClick={handleIconClick}></StyledIcon>
            </ShrinkerWrapper>
            <StyledLink to="/">
              <UserSectionOption>My Resume</UserSectionOption>
            </StyledLink>
            <StyledLink to="/offers">
              <UserSectionOption>Job Offers</UserSectionOption>
            </StyledLink>
            <StyledLink to="/skills">
              <UserSectionOption>Level Up</UserSectionOption>
            </StyledLink>
            <StyledLink to="/login" onClick={logout}>
              <UserSectionOption>Log out</UserSectionOption>
            </StyledLink>
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

const Wrapper = styled(MiniWrapper)`
  justify-content: space-between;
`;

const MarginRightWrapper = styled(MiniWrapper)`
  padding-right: 20px;
`;

const ShrinkerWrapper = styled(MiniWrapper)`
  height: 90px;
`;

const Container = styled.div`
  user-select: none;
  background-color: ${(props) => props.backgroundColor || "#4e148c"};
  height: 8vh;
`;

const Title = styled.div`
  color: #ffff;
  font-weight: bold;
  padding: 5px 5px;
  font-size: 30px;
  padding-left: 10px;
  text-decoration: none;
`;

const StyledImg = styled.img`
  padding-left: 20px;
  max-height: 90%;
  width: auto;
`;
const StyledIcon = styled(StyledImg)`
  max-height: 50%;
  padding-left: 0px;
`;

const UserSectionOption = styled.div`
  user-select: none;
  color: #ffff;
  font-weight: bold;
  padding: 5px;
  font-size: 20px;
  text-decoration: none;
  cursor: pointer;
`;

const UserSection = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  top: 10px;
  margin-right: 15px;
  right: 0;
  box-shadow: 0 0 10px rgba(8, 7, 16, 1);
  background-color: #6f00ef;
  padding: 20px 40px;
  border-radius: 5px 5px 50px 50px; /* Adjust the value as needed */
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
