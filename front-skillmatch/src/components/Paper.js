import React from 'react';
import styled from 'styled-components';

// Assuming Container component is defined elsewhere

const Paper = (props) => {
  return (
    <PaperElement contentEditable="true" height={props.height} onInput={props.onInput}>{props.children}</PaperElement>
  )
}

const PaperElement = styled.div`
  color: black;
  font-weight: 300;

  width: 100%;
  border-radius: 2px;
  min-height: ${(props) => props.height || "5vh"};
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

export default Paper;