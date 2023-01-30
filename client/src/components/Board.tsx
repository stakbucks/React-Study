import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_BASE_URL } from "../api";
import { useRecoilValue } from "recoil";
import { loggedInState } from "../atoms";
import { useCookies } from "react-cookie";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Form = styled.form``;
const Replys = styled.div`
  width: 410px;
  height: 460px;
  border: 1px solid black;
  margin-top: 20px;
`;
const BtnX = styled.button`
  border: none;
  background: transparent;
  margin-left: 4px;
`;

interface IReply {
  id: number;
  text: string;
}

function Board() {
  const [cookies, setCookie] = useCookies(["access_token"]);
  const { register, setValue, handleSubmit } = useForm();
  const [replys, setReplys] = useState<IReply[]>([]);

  const onValid = async (data: any) => {
    const text = String(data.text);
    setValue("text", "");
    axios.post(
      `${SERVER_BASE_URL}/add`,
      {
        id: Date.now(),
        text,
      },
      { withCredentials: true }
    );
  };
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = parseInt(event.currentTarget.name);
    axios
      .delete(`${SERVER_BASE_URL}/delete/${id}`, {
        withCredentials: true,
      })
      .then((response) => console.log(response));
    // axios
    //   .get(`${SERVER_BASE_URL}/replys`, { withCredentials: true })
    //   .then((response) => setReplys(response.data));
  };
  useEffect(() => {
    axios
      .get(`${SERVER_BASE_URL}/replys`, { withCredentials: true })
      .then((response) => setReplys(response.data));
  }, [handleDelete]);
  return (
    <Container>
      <Form onSubmit={handleSubmit(onValid)}>
        <input {...register("text", { required: true })} type="text" />
        <button>입력</button>
      </Form>
      <Replys>
        <ul>
          {replys.map((reply) => (
            <li key={reply.id}>
              <span>{reply.text}</span>
              <BtnX name={reply.id + ""} onClick={handleDelete}>
                ❌
              </BtnX>
            </li>
          ))}
        </ul>
      </Replys>
    </Container>
  );
}
export default Board;
