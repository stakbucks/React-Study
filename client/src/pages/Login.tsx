import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "react-query";
import { loggedInState } from "../../src/atoms";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
const SERVER_BASE_URL = "http://localhost:4000";

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
  gap: 10px;
`;

const Section = styled.div`
  display: flex;
  label {
    margin-right: 5px;
  }
`;

function Login() {
  const navigate = useNavigate();
  const setLoggedIn = useSetRecoilState(loggedInState);
  const { register, setValue, handleSubmit } = useForm();
  const onValid = ({ username, password }: any) => {
    axios
      .post(`${SERVER_BASE_URL}/login`, {
        username,
        password,
      })
      .then((response) => {
        if (response.data === "로그인 성공") {
          setLoggedIn({
            status: true,
            username,
          });
          navigate("/");
        } else console.log(response.data);
      });
  };

  return (
    <Wrapper>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit(onValid)}>
        <Section>
          <label htmlFor="username">아이디</label>
          <input
            {...register("username", { required: true })}
            type="text"
            placeholder="아이디"
          />
        </Section>
        <Section>
          <label htmlFor="password">비밀번호</label>
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="비밀번호"
          />
        </Section>
        <button>로그인</button>
      </Form>
    </Wrapper>
  );
}

export default Login;
