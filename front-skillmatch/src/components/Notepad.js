import React, {  useState } from "react";
import styled from "styled-components";
import { PushableButtonStyled } from "./Noteadbutton";

export const Notepad = (props) => {



  return (
    <Notepadc>
      <Top>
        <PushableButtonStyled onClick={props.close}>Close</PushableButtonStyled>
        <PushableButtonStyled onClick={props.submit}>
          Submit
        </PushableButtonStyled>
      </Top>
      <OuterPaper>
        <Paper contentEditable="true" onInput={props.changeText}></Paper>
      </OuterPaper>
    </Notepadc>
  );
};




const Notepadc = styled.div`
  width: 50%;
  max-width: 600px;
  box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.15);
  border-radius: 0 0 5px 5px;
  overflow: hidden;
  margin: 20px;

  overflow-y: auto;
  -ms-overflow-style: none; 
  scrollbar-width: none; 
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px 0px 10px;
  max-width: 100%;
  height: 90px;
  background: #2c0735;
  border-radius: 5px 5px 0 0;
`;

const OuterPaper = styled.div`
  max-width: 100%;
  padding: 10px;
  background-color: #f1ede9;
`;

const Paper = styled.div`
  width: 100%;
  height: 100%;
  min-height:  "5vh";
  background: repeating-linear-gradient(
    #f1ede9,
    #f1ede9 31px,
    #94acd4 31px,
    #94acd4 32px
  );
  font-family: "Shadows Into Light", cursive;
  line-height: 32px;
  outline: 0;
  font-size: 22px;
`;
