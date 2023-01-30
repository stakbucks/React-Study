import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loggedInState } from "../../src/atoms";
import { useCookies } from "react-cookie";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  width: 50vw;
  height: auto;
  ul {
    display: flex;
    li {
      margin: 0 10px;
      list-style: none;
    }
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  button {
    height: 20px;
    margin-left: 10px;
  }
`;

function Header() {
  const [cookie, setCookie, removeCookie] = useCookies(["access_token"]);
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);
  const handleLogout = () => {
    removeCookie("access_token");
    setLoggedIn({
      status: false,
      username: "",
    });
  };
  return (
    <Wrapper>
      <Nav>
        {loggedIn.status ? (
          <Container>
            <h3>안녕하세요 {loggedIn.username}님</h3>
            <button onClick={handleLogout}>로그아웃</button>
          </Container>
        ) : (
          <ul>
            <li>
              <Link to="/">홈</Link>
            </li>
            <li>
              <Link to="/login">로그인</Link>
            </li>
            <li>
              <Link to="signup">회원가입</Link>
            </li>
          </ul>
        )}
      </Nav>
    </Wrapper>
  );
}
export default Header;
