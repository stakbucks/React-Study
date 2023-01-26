import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { REST_API_KEY, REDIRECT_URI, ADMIN_KEY } from "./LoginData";
function LoggedIn() {
  const location = useLocation();
  const code = location.search.substring(6);
  const [token, setToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [profileImg, setProfileImg] = useState("");

  const getKakaoToken = () => {
    fetch(`https://kauth.kakao.com/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": " application/x-www-form-urlencoded",
      },
      body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}}`,
    })
      .then((response) => response.json())
      .then((data) => {
        setToken(data.access_token);
      });
  };

  const getUser = () => {
    fetch(`https://kapi.kakao.com/v2/user/me`, {
      method: "GET",
      headers: {
        "Content-Type": " application/x-www-form-urlencoded",
        Authorization: `Bearer ${token} `,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoggedIn(true);
        setName(data.properties?.nickname);
        setProfileImg(data.properties?.profile_image);
      });
  };

  const logOut = () => {
    fetch(`https://kapi.kakao.com/v1/user/unlink`, {
      method: "POST",
      headers: {
        "Content-Type": " application/x-www-form-urlencoded",
        Authorization: `Bearer ${token} `,
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  useEffect(() => {
    getKakaoToken();
  }, []);
  useEffect(() => {
    getUser();
  }, [getKakaoToken]);

  return (
    <div>
      <h1>LoggedIn</h1>
      {loggedIn ? (
        <div>
          <div>이름 :{name}</div>
          <img style={{ width: "300px" }} src={profileImg} />
        </div>
      ) : null}
    </div>
  );
}
export default LoggedIn;
