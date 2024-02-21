import React from "react";
import styled from "styled-components";

export const Notepad = () => {
  return (
    <Notepadc>
      <Top></Top>
      <OuterPaper>
        <Paper contentEditable="true"></Paper>
      </OuterPaper>
    </Notepadc>
  );
};

const Notepadc = styled.div`
  width: 50%;
  max-width: 600px;
  box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.15);
  border-radius: 0 0 10px 10px;
  overflow: hidden;
  margin: 20px;
`;
const Top = styled.div`
  width: 100%;
  height: 50px;
  background: #2c0735;
  border-radius: 5px 5px 0 0;
`;

const OuterPaper = styled.div`
  width: 97%;
  padding: 10px;
  background-color: #f1ede9;
`;

const Paper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 60vh;
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
