import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { SERVER_BASE_URL } from "../api";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  background-color: pink;
  width: 300px;
  height: 300px;
`;
const Container = styled.div`
  padding: 8px;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    border: none;
    background: transparent;
    position: absolute;
    right: 10px;
  }
`;
const Form = styled.form``;

function Modal() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { register, setValue, handleSubmit } = useForm();
  console.log(id);
  const onValid = (data: any) => {
    const newReply = String(data.newReply);
    axios
      .put(
        `${SERVER_BASE_URL}/update/${id}`,
        { newReply },
        { withCredentials: true }
      )
      .then((res) => console.log(res));
    setValue("newReply", "");
  };
  return (
    <Wrapper>
      <Container>
        <span
          onClick={() => {
            navigate("/board");
          }}
        >
          x
        </span>
        <h3>Update to...</h3>
        <Form onSubmit={handleSubmit(onValid)}>
          <input {...register("newReply", { required: true })} type="text" />
          <button>수정하기</button>
        </Form>
      </Container>
    </Wrapper>
  );
}
export default Modal;
