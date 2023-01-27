import {
  naverLogin,
  naver_CLIENT_ID,
  naver_CLIENT_SECRET,
  naver_REDIRECT_URI,
} from "./LoginData";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function NaverLoggedIn() {
  const { naver } = window as any;
  const location = useLocation();
  const TOKEN = location.hash.split("=")[1].split("&")[0];
  const STATE = location.hash.split("=")[2].split("&")[0];
  const [status, setStatus] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  // window.addEventListener("load", function () {
  //   naverLogin.getLoginStatus(function (status: any) {
  //     if (status) {
  //       setStatus(status);
  //       setEmail(naverLogin.user.getEmail());
  //       setName(naverLogin.user.getName());
  //       console.log(status);
  //     }
  //   });
  // });
  useEffect(() => {
    naverLogin.getLoginStatus(function (status: any) {
      if (status) {
        setStatus(status);
        setEmail(naverLogin.user.getEmail());
        setName(naverLogin.user.getName());
        console.log(status);
      }
    });
  }, []);

  return (
    <div>
      {status ? (
        <div>
          <h1>LoggedIn</h1>
          <div>이름 : {name} </div>
          <div>이메일 : {email} </div>
        </div>
      ) : null}
    </div>
  );
}
export default NaverLoggedIn;
