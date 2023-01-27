import { useEffect, useState } from "react";
import styled from "styled-components";
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

  useEffect(() => {
    naverLogin.init();
  }, []);

  return (
    <div>
      <KakaoBtn src="login.png" onClick={handleLogin} />
      <div id="naverIdLogin" />
    </div>
  );
}
export default Login;
