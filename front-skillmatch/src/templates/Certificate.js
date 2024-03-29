import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import user from "../images/Logo.png";

// Certificate component
const Certificate = ({ recipientName }) => {
  const { userData } = useAuth();
  const location = useLocation();
  const [deserved, setDeserved] = useState(false);

  const id = location.pathname.split("/")[2];
  const isAdvanced = location.pathname.split("/")[4];
  const skills = JSON.parse(localStorage.skills);

  useEffect(() => {
    skills.map((skill) => {
      if (skill !== undefined) {
        const skn = skill.name;
        if (skn === id) {
          setDeserved("true");
        }
      }
    });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Container>
      {deserved == "true" && (
        <>
          <PrintButton onClick={handlePrint}>Print Certificate</PrintButton>
          <CertificateCard>
            <Header>
              <Img src={user} alt="User" />
              <Title>
                {isAdvanced === "true" ? "ADVANCED " : "INTERMEDIATE "}
                CERTIFICATE
              </Title>
              <Subtitle>OF ACHIEVEMENT IN {id.toUpperCase()}</Subtitle>
            </Header>
            <Body>
              <PresentedTo>THIS CERTIFICATE IS PRESENTED TO</PresentedTo>
              <Name>{localStorage.getItem("firstName").toUpperCase()}</Name>
              <Name>{localStorage.getItem("lastName").toUpperCase()}</Name>
              <Description>
                Through meticulous assessment and evaluation of your acquired
                skills, we are thrilled to confirm that your proficiencies align
                perfectly with the criteria set forth by our certification
                program. This confirmation serves as a testament to your
                dedication and commitment to mastering the material presented in
                our courses. As a result, we are delighted to present you with a
                well-deserved certificate, recognizing your accomplishments and
                empowering you to showcase your capabilities confidently in your
                professional endeavors.
              </Description>
            </Body>
          </CertificateCard>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f8f8;
`;

const Img = styled.img`
  opacity: 0.8;
  height: 5em;
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
  position: relative;
  margin-bottom: 1.5em;
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: 3em;
  color: #858ae3;
  margin: 0.5em 0;
`;

const Subtitle = styled.h2`
  text-transform: uppercase;

  font-size: 1.5em;
  color: #333;
  margin: 0;
  font-weight: normal;
`;

const Body = styled.div`
  position: relative;
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
  text-transform: uppercase;
`;

const Description = styled.p`
  font-size: 1em;
  color: #666;
  margin: 1.5em auto;
  width: 80%;
  line-height: 1.6;
`;

const PrintButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 15px;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
`;

export default Certificate;
