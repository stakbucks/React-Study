import { useEffect, useState } from "react";
import styled from "styled-components";
import {
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

const { naver } = window as any;
export const naverLogin = new naver.LoginWithNaverId({
  clientId: `${naver_CLIENT_ID}`,
  callbackUrl: `${naver_REDIRECT_URI}`,
  isPopup: false,
  loginButton: { color: "green", type: 3, height: 58 },
  callbackHandle: true,
});

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
