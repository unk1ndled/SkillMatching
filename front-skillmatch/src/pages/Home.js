import GlobalStyle from "../components/GlobalStyles";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Add from "../images/add.svg"


const Home = () => {
  return (
    <div>
      <GlobalStyle />
      <Navbar title="Resumer" />
      <Center>
        <StyledImg src={Add}/>
      </Center>
    </div>
  );
};

const Center = styled.div `
  position: absolute;
  height: 500px;
  transform: translate(-50%,-50%);
  top: 50%;
  left: 50%;
`
const StyledImg = styled.img`
  max-height: 100%;
  width: auto;
`;



export default Home;
