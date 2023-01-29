import styled from "styled-components";
import { Link } from "react-router-dom";
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
function Success() {
  return (
    <Wrapper>
      <h1>회원가입 성공!</h1>
      <div>
        <Link to="/">홈으로 돌아가기</Link>
      </div>
      <div>
        <Link to="/login">로그인 하러 가기</Link>
      </div>
    </Wrapper>
  );
}
export default Success;
