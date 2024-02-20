import GlobalStyle from "../components/GlobalStyles";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Add from "../images/add.svg";

const Home = () => {
  
  
  return (
    <div>
      <GlobalStyle />
      <Navbar title="Resume" />
      <Center>
        <Text >Add your resume</Text>
        <StyledImg src={Add}   />
        <Text>Enter your experiences and competencies</Text>
      </Center>
    </div>
  );
};



const Text = styled.div`
  font-weight: bold;
  font-size: xx-large;
  color: white;
  margin: 20px 0px 20px 20px;
  text-align: center;

`
const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  user-select: none;

  height: 500px;
  transform: translate(-50%, -50%);
  top: 60%;
  left: 50%;

`;
const StyledImg = styled.img`
  max-height: 70%;
  width: auto;
  cursor: pointer;

`;

export default Home;
