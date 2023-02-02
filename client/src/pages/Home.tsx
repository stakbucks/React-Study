import { ThemeProvider } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Board from "../components/Board";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Home() {
  return (
    <Wrapper>
      <h1>This is my homepage</h1>
      <Outlet />
    </Wrapper>
  );
}
export default Home;
