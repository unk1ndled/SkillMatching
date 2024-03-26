import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ListElement = ({ title, ...props }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const ContainerElement = props.route ? StyledLink : Ghost;


  return (
    <ContainerElement to={props.route}>
      <Container
        bgcolor={props.bgcolor}
        onClick={props.onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {title ? <Title>{title}</Title> : <Title>Add</Title>}

      </Container>
    </ContainerElement>
    
  );
};

export default ListElement;

const Ghost = styled.div`
`
const Container = styled.div`
  position: relative; /* Make it a reference for absolutely positioned child */
  background-color: ${(props) => props.bgcolor || "#6F00EF"} ;
  height: 20vh;
  overflow-y: hidden;
  flex: 0 0 calc(29% - 20px);
  margin-bottom: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5em;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.05);
    background-color: #f7b538;
    transition: transform 0.3s ease;
  }

  &:active {
    transform: scale(0.95);
    transition: transform 0.1s ease;
  }
`;



const Title = styled.div`
  color: #ffffff;
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
  font-size: larger;
  text-align: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
