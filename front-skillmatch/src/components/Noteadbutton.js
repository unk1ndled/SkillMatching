import styled from 'styled-components';

export const PushableButton = styled.button`
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  transition: filter 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover {
    filter: brightness(110%);
    -webkit-filter: brightness(110%);
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

export const Shadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: hsl(0deg 0% 0% / 0.25);
  will-change: transform;
  transform: translateY(2px);
  transition: transform 600ms cubic-bezier(.3, .7, .4, 1);

  ${PushableButton}:hover & {
    transform: translateY(4px);
    transition: transform 250ms cubic-bezier(.3, .7, .4, 1.5);
  }

  ${PushableButton}:active & {
    transform: translateY(1px);
    transition: transform 34ms;
  }
`;

export const Edge = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: linear-gradient(to left, hsl(251deg 100% 16%) 0%, hsl(251deg 100% 32%) 8%, hsl(251deg 100% 32%) 92%, hsl(251deg 100% 16%) 100%);
`;

export const Front = styled.span`
  display: block;
  position: relative;
  border-radius: 12px;
  font-size: 1.1rem;
  color: white;
  background: hsl(256, 52%, 50%, 1);
  will-change: transform;
  transform: translateY(-4px);
  transition: transform 600ms cubic-bezier(.3, .7, .4, 1);

  @media (min-width: 768px) {
    font-family: "Nunito", sans-serif;
    font-weight: 500;
    font-size: 1.25rem;
    padding: 12px 42px;
  }

  ${PushableButton}:hover & {
    transform: translateY(-6px);
    transition: transform 250ms cubic-bezier(.3, .7, .4, 1.5);
  }

  ${PushableButton}:active & {
    transform: translateY(-2px);
    transition: transform 34ms;
  }
`;

export const PushableContainer = styled.div`
  position: relative;
`;

export const PushableButtonStyled = ({ children, ...props }) => {


  return (
    <PushableContainer>
      <PushableButton {...props} onClick={props.onClick}>
        <Shadow className="button-82-shadow" />
        <Edge className="button-82-edge" />
        <Front className="button-82-front">{children}</Front>
      </PushableButton>
    </PushableContainer>
  );
};
