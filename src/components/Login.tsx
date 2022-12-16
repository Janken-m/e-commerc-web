import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { SetToken } from "../store/Token";
import Background from "./Login/Background";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Joi from "joi";

const Login = () => {
  const dispatch = useDispatch();
  interface ILogin {
    email: string;
    password: string;
  }

  type Errors = {
    [Property in keyof ILogin]?: string;
  };

  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("email"),
    password: Joi.string().required().label("password"),
  });

  const navigate = useNavigate();
  const [formData, setFormData] = useState<ILogin>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  function handleChange({ target: input }: ChangeEvent<HTMLInputElement>) {
    const inputName = input.name as keyof ILogin;

    const errorMessage = validateProperty(input);

    if (errorMessage) errors[inputName] = errorMessage;
    else delete errors[inputName];

    setErrors({ ...errors });

    formData[inputName] = input.value as unknown as ILogin[keyof ILogin];

    setFormData({ ...formData });
  }

  function validate() {
    const options: Joi.ValidationOptions = { abortEarly: false };
    const { error } = schema.validate(formData, options);

    if (!error) return null;

    const errors: Errors = {};
    for (const detail of error.details)
      errors[detail.path[0] as keyof Errors] = detail.message;

    return errors;
  }

  function validateProperty({ name, value }: HTMLInputElement) {
    const subSchema = schema.extract(name);
    const { error } = subSchema.validate(value);

    if (!error) return null;

    return error.message;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors || {});

    if (errors) return null;

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/user/signin",
        formData
      );
      localStorage.setItem("token", data.token);
      toast.success(data.message);
      setFormData({
        email: "",
        password: "",
      });
      window.location.href = "/";
    } catch (error: any) {
      error.response.data.message && console.log(error.response.data.message);
    }
  };

  return (
    <Container>
      <BackgroundStyle>
        <Background />
      </BackgroundStyle>
      <Wrapper>
        <Title>SIGN IN TO YOUR ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            name="email"
          />
          {errors["email"] && <ErrorMsg>{errors["email"]}</ErrorMsg>}
          <Input
            placeholder="Password"
            type="password"
            onChange={handleChange}
            value={formData.password}
            name="password"
          />
          {errors["password"] && <ErrorMsg>{errors["password"]}</ErrorMsg>}
          <Button>LOGIN</Button>
          {/* {error && <Error>Something went wrong...</Error>} */}
          <Link onClick={() => navigate("/forgetpassword")}>
            DO NOT YOU REMEMBER THE PASSWORD?
          </Link>
          <Link onClick={() => navigate("/register")}>
            CREATE A NEW ACCOUNT
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;

const ErrorMsg = styled.p`
  color: red;
  border: none;
  font-size: 14px;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackgroundStyle = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-size: cover;
  z-index: -1;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  padding: 20px;
  background-color: white;
  border-radius: 1rem;
  box-shadow: -3px -3px 9px #70a3ff, 3px 3px 7px #f61dff;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  border: none;
  border-bottom: 1px solid black;

  ::placeholder {
    text-align: center;
  }

  :focus {
    outline: none;
    text-align: center;
  }
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: var(--primary);
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.p`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;
