import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import user from "../images/bhju.png";

const Profile = () => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [objective, setObjective] = useState(null);
  const [skills, setSkills] = useState(null);
  const [history, setHistory] = useState(null);
  return (
    <Container>
      <Navbar backgroundColor={"#613DC1"}></Navbar>
      <UpperWrapper>
        <UpperLeftDiv></UpperLeftDiv>
        <FullName>
          <NameText>Salmane Mohammed Amine</NameText>
        </FullName>
      </UpperWrapper>
      <LowerWrapper>
        <LowerLeftWrapper>
          <CancerDiv>
            <Picture src={user}></Picture>
            <UserAbout>
              bhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskiono
            </UserAbout>
          </CancerDiv>
        </LowerLeftWrapper>
        <UserInfo>
          <SegmentName>skills</SegmentName>
          <Segment>
            {" "}
            bhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskiono
            bhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskiono{" "}
          </Segment>
          <SegmentName>history</SegmentName>
          <Segment>
            {" "}
            bhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskiono
            bhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskionobhuskiono{" "}
          </Segment>
        </UserInfo>
      </LowerWrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 92vh;
`;

const UpperWrapper = styled.div`
  padding-top: 1%;
  background-color: #613dc1;
  height: 20%;
  display: flex;
  flex-direction: row;
  box-sizing: border-box; /* Include padding and border in the width */
`;

const LowerWrapper = styled.div`
  background-color: #2C0735;
  height: 80%;
  display: flex;
  flex-direction: row;
`;

const LowerLeftWrapper = styled.div`
  height: 100%;
  width: 30%;
  border-right: 2px solid #613dc1;
  position: relative;
`;

const UserInfo = styled.div`
  height: 100%;
  width: 68%;
  display: flex;
  flex-direction: column;
  gap: 2vh;
  padding: 0px 5px 0px 5px;

  overflow-y: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 20px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #613dc1;
    border-radius: 20px;
    border: 8px solid transparent;
    background-clip: content-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #6F00EF;
  }
`;

const SegmentName = styled.div`
  font-size: 3vw;
  font-weight: bold;
  color: #613dc1;
`;

const Segment = styled.div`
  position: relative;
  width: 100%;
  min-height: 30vh;

  color: #2c0735;
  font-weight: bold;
  height: auto;
  /* x-offset, y-offset, blur-radius, spread-radius, color */
  background-color: #613dc1;
  padding: 5px;
  box-sizing: border-box; /* Include padding and border in the width */
  word-wrap: break-word; /* or overflow-wrap: break-word; */
  overflow-y: auto;
  scrollbar-width: none;


`;

const FullName = styled(UserInfo)`
  position: relative;
  scrollbar-width: none;

`;

const NameText = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  font-size: 6vw;
  font-weight: bold;
  color: #2c0735;
  white-space: nowrap; /* Prevent text from wrapping */
  overflow: hidden; /* Hide overflow */
  text-overflow: ellipsis; /* Display ellipsis (...) for overflow text */
`;

const UpperLeftDiv = styled(LowerLeftWrapper)``;

const CancerDiv = styled.div`
  width: 70%;
  position: absolute;
  top: -15vh; /* Adjust as needed to move the child div up */
  display: flex;
  flex-direction: column;
  left: 15%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
`;

const Picture = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const UserAbout = styled(Segment)`
  min-height: 0vh;
`;

export default Profile;
