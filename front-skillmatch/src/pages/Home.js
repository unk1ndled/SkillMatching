import GlobalStyle from "../components/GlobalStyles";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Add from "../images/add.svg";
import React, { useState } from "react";
import { Notepad } from "../components/Notepad";

const Home = () => {
  const [showNotepad, setShowNotepad] = useState(false);

  const handleIconClick = () => {
    console.log("first");
    setShowNotepad(!showNotepad);
  };

  return (
    <div>
      <GlobalStyle />
      <Navbar title="Resume" />

      <Center>
        <Text>Add your resume</Text>
        <StyledImg src={Add} onClick={handleIconClick} />
        <Text>Enter your experiences and competencies</Text>
      </Center>
      {showNotepad && (
        <Notepadwrapper >
          <Notepad close={handleIconClick} submit={handleIconClick}/>
        </Notepadwrapper>
      )}
    </div>
  );
};
const Notepadwrapper = styled.div`
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

const Text = styled.div`
  font-weight: bold;
  font-size: xx-large;
  color: white;
  margin: 20px 0px 20px 0px;
  text-align: center;
`;
const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  margin-top: 8%;
  height: 500px;
`;
const StyledImg = styled.img`
  max-height: 70%;
  width: auto;
  cursor: pointer;
`;

export default Home;
