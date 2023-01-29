import { atom } from "recoil";
export interface ILoggedInState {
  status: boolean;
  username: string;
}
export const loggedInState = atom<ILoggedInState>({
  key: "loggedIn",
  default: {
    status: false,
    username: "",
  },
});
