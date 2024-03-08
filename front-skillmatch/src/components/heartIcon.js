import React, { useState } from 'react';
import styled from 'styled-components';

const Heart = styled.div`
  position: relative;
  width: 100px;
  height: 90px;
  cursor: pointer;

  &:before,
  &:after {
    position: absolute;
    content: "";
    left: 50px;
    top: 0;
    width: 50px;
    height: 80px;
    background: ${props => props.heartColor || '#858AE3'}; /* Default color is #858AE3 */
    border-radius: 50px 50px 0 0;
    transform-origin: 0 100%;
  }

  &:before {
    transform: rotate(-45deg);
  }

  &:after {
    left: 0;
    transform: rotate(45deg);
    transform-origin: 100% 100%;
  }
`;

const HeartComponent = () => {
  const [color, setColor] = useState('#858AE3');

  const handleClick = () => {
    setColor(color === '#858AE3' ? '#F7B538' : '#858AE3');
  };

  return <Heart heartColor={color} onClick={handleClick} />;
};

export default HeartComponent ;
