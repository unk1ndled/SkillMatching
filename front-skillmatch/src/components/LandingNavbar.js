import styled from "styled-components";
import LogoWithName from "../images/LogoWithName.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <StyledImg src={LogoWithName} />
        <MiniWrapper>
          <Link to="/login">
            {" "}
            <AuthText>Log-in</AuthText>
          </Link>
          <Link to="/register">
            <AuthText>Register</AuthText>
          </Link>
        </MiniWrapper>
      </Wrapper>
    </Container>
  );
};
export default Navbar;

const MiniWrapper = styled.div`
  display: flex;
  justify-content: center; /* Align items horizontally */
`;

const Container = styled.div`
  background-color: #4e148c;
  height: 60px;
`;

const AuthText = styled.div`
  color: #ffff;
  font-weight: bold;
  padding: 5px 5px;
`;
const Wrapper = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledImg = styled.img`
  padding-left: 10px;
  max-height: 90%;
  width: auto;
`;
