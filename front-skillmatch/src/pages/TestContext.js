import styled from "styled-components";
import bg2 from "../images/bg2.jpg";
import Logo from "../components/Logo";
import LogoWithName from "../images/LogoWithName.png";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { useAuth } from "../context/AuthContext";




const TestContext = () => {

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [objective, setObjective] = useState(null);
  const [history, setHistory] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const { userData } =  useAuth();
  console.log(userData);




  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/profiles/${userData.id}`
      );
      //const data = await response.json();
  
      console.log(response.data.history)
      console.log(JSON.parse(response.data.history))
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);




  return (
    <Container>
      <StyledImg src={bg2} />
      <Form >
        <AuthText>{JSON.stringify(userData ? userData.role : userData)}</AuthText>
        
        <Wrapper>
          <Logo src={LogoWithName} />
        </Wrapper>
      </Form>
    </Container>
  );
};

const Wrapper = styled.div`
  margin-top: 20px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RegisterWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const AuthText = styled.div`
  font-family: "Nunito", sans-serif;
  font-weight: bold;
  text-align: center;
  font-size: ${(props) => props.size || "2em"};
  color: white;
`;
const Input = styled.input`
  display: block;
  height: 50px;
  width: 100%;
  border: none;
  outline: none;
  background: rgba(1, 1, 1, 0.07);
  border-radius: 5px;
  margin-top: 30px;
  font-size: 18px;
  font-weight: 550;
  color: #2c0735;
  text-align: center; /* Center the text horizontally */

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Form = styled.form`
  height: flex;
  width: 350px;
  background: rgba(255, 255, 255, 0.13);
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 20px;
  backdrop-filter: blur(9px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 10px rgba(100, 100, 100, 0.6);
  padding: 50px 35px;
`;

const Container = styled.div`
  background-color: #4e148c;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden; /* Hide overflow content */
`;

const StyledImg = styled.img`
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
`;

const ErrorText = styled.div`
  font-weight: 500;
  font-size: 24px;
  color: red;
  text-align: center;
  margin-top: 20px;
  background: #f7b53840;
  padding: 10px; /* Add padding for better readability */
  border-radius: 20px;
  backdrop-filter: blur(50px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 10px rgba(100, 100, 100, 0.6);
`;

export default TestContext;
