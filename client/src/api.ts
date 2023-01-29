import axios from "axios";
import { useRecoilState } from "recoil";
import { todoListState } from "./atoms";
export const SERVER_URL = "http://localhost:4000/api/todo";

export const fetchTodo = async () => {
  return axios.get(SERVER_URL);
};
