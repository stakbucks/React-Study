import styled from "styled-components";
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
    </Wrapper>
  );
}
export default Home;
