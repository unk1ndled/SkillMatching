import styled from 'styled-components';


import React from 'react'

export const LoginButton = ({ children, ...props }) => {
  return (
    <Button {...props}>{children}</Button>
  )
}



const Button = styled.button`
  align-items: center;
  appearance: none;
  background-clip: padding-box;
  background-color: initial;
  background-image: none;
  border-style: none;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  flex-direction: row;
  flex-shrink: 0;
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  font-weight: 800;
  justify-content: center;
  line-height: 24px;
  margin: 0;
  min-height: 64px;
  outline: none;
  overflow: visible;
  padding: 19px 26px;
  pointer-events: auto;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  width: auto;
  word-break: keep-all;
  z-index: 0;

  @media (min-width: 768px) {
    padding: 19px 32px;
  }

  &:before,
  &:after {
    border-radius: 80px;
  }

  &:before {
    background-color: ${(props) => props.secondaryColor || "#4e148c"};
    content: "";
    display: block;
    height: 100%;
    left: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -2;
  }

  &:after {
    background-color: initial;
    background-image: linear-gradient(0deg, ${(props) => props.primaryColor || "#4e148c"} 0, ${(props) => props.primaryColor || "#4e148c"} 100%);
    bottom: 4px;
    content: "";
    display: block;
    left: 4px;
    overflow: hidden;
    position: absolute;
    right: 4px;
    top: 4px;
    transition: all 100ms ease-out;
    z-index: -1;
  }

  &:hover:not(:disabled):after {
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    transition-timing-function: ease-in;
  }

  &:active:not(:disabled) {
    color: #ccc;
  }

  &:active:not(:disabled):after {
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
      linear-gradient(0deg, ${(props) => props.secondaryColor || "#4e148c"} 0, ${(props) => props.secondaryColor || "#4e148c"} 100%);
    bottom: 4px;
    left: 4px;
    right: 4px;
    top: 4px;
  }

  &:disabled {
    cursor: default;
    opacity: 0.24;
  }
`;

export default Button;
