import { atom } from "recoil";

export const REDIRECT_URI = "http://localhost:3000/loggedIn";
export const JS_KEY = "6f9b0992acef9cb2ace0f62b71b97526";
export const REST_API_KEY = "bc0b97d55280047c1d780330acf35056";
export const ADMIN_KEY = "	3620a1d3d7fd9d73b0ed4a00dd6c4961";

export const naver_CLIENT_ID = "zm4zPtCBVYDxgaRJeDxA";
export const naver_CLIENT_SECRET = "wromtwyBwM";
export const naver_REDIRECT_URI = "http://localhost:3000/naverLoggedIn";

export const loggedInState = atom({
  key: "loggedIn",
  default: false,
});
const { naver } = window as any;
export const naverLogin = new naver.LoginWithNaverId({
  clientId: "zm4zPtCBVYDxgaRJeDxA",
  callbackUrl: "http://localhost:3000/naverLoggedIn",
  isPopup: false,
  loginButton: { color: "green", type: 3, height: 58 },
  callbackHandle: true,
});
