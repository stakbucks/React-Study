import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import NavDropdown from "react-bootstrap/esm/NavDropdown";
import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { loggedInState } from "../atoms";
import { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import styled from "styled-components";

const StyledNavbar = styled(Navbar)`
  width: 100%;
  background-color: grey;
  margin-bottom: 50px;
`;

function Navigator() {
  const [cookie, setCookie, removeCookie] = useCookies(["access_token"]);
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);
  useEffect(() => console.log(loggedIn), []);
  const handleLogout = () => {
    removeCookie("access_token");
    setLoggedIn({
      status: false,
      username: "",
    });
  };
  return (
    <StyledNavbar expand="lg">
      <Container>
        <Navbar.Brand href="/">Stakbucks</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              홈
            </Nav.Link>
            <Nav.Link as={Link} to="/board">
              게시판
            </Nav.Link>
            {loggedIn.status ? (
              <NavDropdown
                title={`${loggedIn.username}님`}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to="/userinfo">
                  회원정보
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Button
                    style={{ width: "80px", height: "40px" }}
                    variant="outline-success"
                    onClick={handleLogout}
                  >
                    로그아웃
                  </Button>
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="계정" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/signup">
                  회원가입
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/login">
                  로그인
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  );
}
export default Navigator;
