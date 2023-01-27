import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { loggedInState } from "./LoginData";
import {
  naverLogin,
  naver_CLIENT_ID,
  naver_REDIRECT_URI,
  REDIRECT_URI,
  REST_API_KEY,
} from "./LoginData";

const KakaoBtn = styled.img``;
const NaverBtn = styled.img`
  width: 300px;
  height: 50px;
`;

function Login() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  const [status, setStatus] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);

  useEffect(() => {
    naverLogin.init();
    naverLogin.getLoginStatus(function (status: any) {
      if (status) {
        setLoggedIn(status);
        console.log(status);
      }
    });
  }, []);

  return (
    <div>
      <div>
        <KakaoBtn
          style={{ display: loggedIn ? "none" : "" }}
          src="login.png"
          onClick={handleLogin}
        />
        <div id="naverIdLogin" />
      </div>
      <Outlet />
    </div>
  );
}
export default Login;
