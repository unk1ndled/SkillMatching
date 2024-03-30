import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import user from "../images/placeholder.jpg";

import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const [firstName, setFirstName] = useState(
    localStorage.getItem("firstName") || null
  );
  const [lastName, setLastName] = useState(
    localStorage.getItem("lastName") || null
  );
  const [objective, setObjective] = useState(
    localStorage.getItem("objective") || null
  );
  const [experience, setExperience] = useState(
    JSON.parse(localStorage.getItem("experience")) || null
  );

  const [skills, setSkills] = useState(
    JSON.parse(localStorage.getItem("skills")) || null
  );

  const { userData } = useAuth();

  const SERVER = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {});
  const fetchProfile = async () => {
    try {
      const response = await fetch(`${SERVER}api/v1/profiles/${userData.id}`);

      // Check if the response is OK
      if (!response.ok) {
        // If user profile doesn't exist, throw 404 error
        if (response.status === 404) {
          //kanlo7o l user mn hna
          window.location.href = "/addresume";
          throw new Error("User not found");
        }
        // For other errors, throw appropriate error
        throw new Error(
          `Failed to fetch user profile. Status: ${response.status}`
        );
      }

      const data = await response.json();

      // Proceed with setting profile data
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setObjective(data.objective);
      setExperience(JSON.parse(data.experience));

      // Store data in localStorage
      localStorage.setItem("firstName", data.firstName);
      localStorage.setItem("lastName", data.lastName);
      localStorage.setItem("objective", data.objective);
      localStorage.setItem("experience", data.experience);

      // Fetch skills for each skill ID and add the second value of data.recognizedSkills
      const skillsData = await Promise.all(
        Object.entries(data.recognizedSkills).map(async ([skillId, value]) => {
          try {
            const skillResponse = await fetch(
              `${SERVER}api/v1/keywords/${skillId}`
            );
            if (!skillResponse.ok) {
              // If the skill doesn't exist anymore, send a request to delete it
              if (skillResponse.status === 404) {
                await fetch(
                  `${SERVER}api/v1/profiles/${userData.id}/keywords/${skillId}`,
                  {
                    method: "DELETE",
                  }
                );
                return null; // Return null to filter out this skill from the final array
              }
              throw new Error(
                `Failed to fetch skill data. Status: ${skillResponse.status}`
              );
            }

            const skillData = await skillResponse.json();

            // Add the second value from data.recognizedSkills to the skill data
            skillData.value = value;

            return skillData;
          } catch (error) {
            console.error(`Error fetching skill ${skillId}:`, error);
            return null; // Return null to filter out this skill from the final array
          }
        })
      );

      // Filter out any null values (skills that were deleted)
      const filteredSkillsData = skillsData.filter((skill) => skill !== null);

      setSkills(filteredSkillsData);

      // Store skills in localStorage
      localStorage.setItem("skills", JSON.stringify(filteredSkillsData));
    } catch (error) {
      // Handle errors, including the case when the user is not found\

      //redirect user from here

      console.error("Error fetching profile:", error);
      // Stop function execution
      return;
    }
  };

  return (
    <Container>
      <Navbar backgroundColor={"#613DC1"}></Navbar>
      <UpperWrapper>
        <UpperLeftDiv></UpperLeftDiv>
        <FullName>
          <NameText>
            {firstName} {lastName}
          </NameText>
        </FullName>
      </UpperWrapper>
      <LowerWrapper>
        <LowerLeftWrapper>
          <CancerDiv>
            <Picture src={user}></Picture>
            <UserAbout>
              {"my objective : " + objective}
            </UserAbout>
          </CancerDiv>
        </LowerLeftWrapper>
        <UserInfo>
          <SegmentName>skills</SegmentName>
          <SkillSegment>
            {skills != null &&
              skills.map((keyword, index) => (
                <StyledLink to={`/skills/${keyword.id}`}>
                  <Skill>
                    <SkillText> {keyword.name}</SkillText>
                  </Skill>
                </StyledLink>
              ))}
          </SkillSegment>
          <SegmentName>experience</SegmentName>
          <Segment>
            {experience != null &&
              experience.map((exp, index) => (
                <div>
                  {"was a " + exp.title}
                  <br></br>
                  {"at " + exp.company}
                  <br></br>
                  {"in " + exp.location}
                  <br></br>
                  {"started in" + exp.startDate}
                  <br></br>
                  {"ended in " + exp.endDate}
                  <br></br>
                  {exp.responsibilities}
                  <br></br>
                </div>
              ))}
          </Segment>
          <StyledLink to="/addresume">
            <SegmentName>reset profile</SegmentName>
          </StyledLink>
          <StyledLink to="/test">
            <SegmentName>print resume</SegmentName>
          </StyledLink>
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
  border-bottom: 0.3em solid #2c0735; /* You can adjust the width and color as needed */
`;

const LowerWrapper = styled.div`
  background-color: #2c0735;
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
    background-color: #6f00ef;
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

const SkillSegment = styled(Segment)`
  display: grid;
  padding: 0.5em;
  grid-template-columns: repeat(
    auto-fill,
    minmax(200px, 1fr)
  ); /* Adjust minmax values as needed */
  gap: 1vw;
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

const FullName = styled(UserInfo)`
  position: relative;

  scrollbar-width: none;
`;

const NameText = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  font-size: 6em;
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
  max-height: 10em;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  height: 5em;
`;

export default Profile;
