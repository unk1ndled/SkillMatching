import styled from "styled-components";
import bg2 from "../images/bg2.jpg";
import { LoginButton } from "../components/LoginButton";
import Logo from "../components/Logo";
import LogoWithName from "../images/LogoWithName.png";
import axios from 'axios';
import React, { useState } from 'react';

const Login = () => {

  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', {
                email,
                password
            });
            console.log(response.data.token);
        } catch (error) {
            console.error('Authentication failed', error);
        }
    };

  return (
    <Container>
      <StyledImg src={bg2} />
      <Form onSubmit={handleSubmit}>
        <AuthText>Login</AuthText>
        <Input 
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <Input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <Wrapper>
          <LoginButton primaryColor="#858AE3" secondaryColor="#4E148C" type="submit">Continue</LoginButton>
        </Wrapper>
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
  display: flex; /* Set display to flex */
  justify-content: center;
  align-items: center;
`;

const AuthText = styled.div`
  font-family: "Nunito", sans-serif;
  font-weight: bold;
  text-align: center;
  font-size: 2em;
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
  color: #2C0735;
  text-align: center; /* Center the text horizontally */

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Form = styled.form`
  height: 400px;
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
export default Login;
