import styled from "styled-components";
import Logo from "../images/Logo.png";
import User from "../images/user.png";
import { Link } from "react-router-dom";

const Navbar = ({ title, backgroundColor }) => {
  return (
    <Container backgroundColor={backgroundColor}>
      <Wrapper>
        <MiniWrapper>
          <StyledImg src={Logo} />
          <Title>{ title }</Title>
        </MiniWrapper>
        <StyledIcon src={User} />
      </Wrapper>
    </Container>
  );
};
export default Navbar;


const MiniWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const Container = styled.div`
  background-color: ${(props) => props.backgroundColor || "#4e148c"};
  height: 60px;
`;

const Title = styled.div`
  color: #ffff;
  font-weight: bold;
  padding: 5px 5px;
  font-size: 30px;
  padding-left: 10px;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


const StyledImg = styled.img`
  padding-left: 20px;
  max-height: 90%;
  width: auto;
`;
const StyledIcon = styled(StyledImg)`
    max-height: 50%;
    padding-right: 20px;
    padding-left: 0px;
`
