import styled from "styled-components";
import { REDIRECT_URI, REST_API_KEY } from "./LoginData";

const KakaoBtn = styled.img``;
function Login() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  return (
    <div>
      <KakaoBtn src="login.png" onClick={handleLogin} />
    </div>
  );
}
export default Login;
