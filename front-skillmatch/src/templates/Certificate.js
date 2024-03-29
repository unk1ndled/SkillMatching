import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f8f8;
`;

const CertificateCard = styled.div`
  padding: 2em;
  width: 80%;
  max-width: 1000px;
  background-color: #fff;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  text-align: center;
`;

const Header = styled.div`
  margin-bottom: 1.5em;
`;

const Title = styled.h1`
  font-size: 3em;
  color: #27ae60;
  margin: 0.5em 0;
`;

const Subtitle = styled.h2`
  font-size: 1.5em;
  color: #333;
  margin: 0;
  font-weight: normal;
`;

const Body = styled.div`
  margin-bottom: 1.5em;
`;

const PresentedTo = styled.p`
  font-size: 1.1em;
  color: #555;
  margin: 1.5em 0;
`;

const Name = styled.h3`
  font-size: 2.5em;
  color: #333;
  margin: 0;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 1em;
  color: #666;
  margin: 1.5em auto;
  width: 80%;
  line-height: 1.6;
`;

// Certificate component
const Certificate = ({ recipientName }) => {
  return (
    <Container>
      <CertificateCard>
        <Header>
          <Title>CERTIFICATE</Title>
          <Subtitle>OF ACHIEVEMENT</Subtitle>
        </Header>
        <Body>
          <PresentedTo>THIS CERTIFICATE IS PRESENTED TO</PresentedTo>
          <Name>{recipientName}</Name>
          <Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur.
          </Description>
        </Body>
      </CertificateCard>
    </Container>
  );
};

export default Certificate;
