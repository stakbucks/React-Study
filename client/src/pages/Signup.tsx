import { useForm } from "react-hook-form";
import styled from "styled-components";
import axios from "axios";
import { SERVER_BASE_URL } from "../api";
import { useLocation, useNavigate } from "react-router-dom";
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  div {
    margin: 3px 0;
    label {
      margin-right: 5px;
    }
  }
  button {
    margin-top: 10px;
  }
`;
function Signup() {
  const navigate = useNavigate();
  const { register, setValue, handleSubmit } = useForm();
  const onValid = async ({ username, password, birthday }: any) => {
    const response: { data: string } = await axios.post(
      `${SERVER_BASE_URL}/signup`,
      {
        username,
        password,
        birthday,
      }
    );
    console.log(response);
    if (response.data === "success") {
      navigate("/success");
    }
  };
  return (
    <Wrapper>
      <h1>회원가입</h1>
      <Form onSubmit={handleSubmit(onValid)}>
        <div>
          <label htmlFor="username">아이디</label>
          <input {...register("username", { required: true })} type="text" />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            {...register("password", { required: true })}
            type="password"
          />
        </div>
        <div>
          <label htmlFor="username">생년월일</label>
          <input {...register("birthday", { required: true })} type="date" />
        </div>
        <button>가입</button>
      </Form>
    </Wrapper>
  );
}
export default Signup;
