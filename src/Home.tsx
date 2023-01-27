import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import Login from "./Login";

const Form = styled.form`
  width: 30vw;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

interface ISubmit {
  id: string;
  password: string;
}

function Home() {
  const { register, setValue, handleSubmit } = useForm<ISubmit>();
  const navigate = useNavigate();
  const onValid = (data: ISubmit) => {
    setValue("id", "");
    setValue("password", "");
    console.log(data);
  };
  return (
    <div>
      <Outlet />
    </div>
  );
}
export default Home;
