import styled from "styled-components";
import bg3 from "../images/bg3.jpg";

const Register = () => {
  return (
    <Container>
      <StyledImg src={bg3} />
      <Form></Form>
    </Container>
  );
};


const Form = styled.div`
  height: 500px;
  width: 350px;
  background: rgba(255,255,255,0.13);
  position: absolute;
  transform: translate(-50%,-50%);
  top: 50%;
  left: 50%;
  border-radius: 20px;
  backdrop-filter: blur(9px);
  border: 2px solid rgba(255,255,255,0.1);
  box-shadow: 0 0 10px rgba(8,7,16,0.6);
  padding: 50px 35px;
  `




const Container = styled.div`
  background-color: #4e148c;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden; /* Hide overflow content */

`;

const StyledImg = styled.img`
  max-width: 100%;
  height: auto;
`;

export default Register;
