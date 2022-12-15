import styled from "styled-components";
import { mobile } from "../responsive";
import Background from "./Register/Background";
import { useNavigate } from "react-router-dom";
import { useState, ChangeEvent } from "react";
import Joi from "joi";
import axios from "axios";
import { toast } from "react-toastify";
import { useSigninUpUserMutation } from "../store/Api";

interface IRegister {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
}

type Errors = {
  [Property in keyof IRegister]?: string;
};

const schema = Joi.object({
  firstname: Joi.string().min(2).required().label("First name"),
  lastname: Joi.string().min(2).required().label("lastname"),
  phone: Joi.string().min(10).required().label("phone number"),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("email"),
  password: Joi.string().min(6).required().label("password"),
});

const Register = () => {
  const [RegisterUser, { data: response }] = useSigninUpUserMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IRegister>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  function handleChange({ target: input }: ChangeEvent<HTMLInputElement>) {
    const inputName = input.name as keyof IRegister;

    const errorMessage = validateProperty(input);

    if (errorMessage) errors[inputName] = errorMessage;
    else delete errors[inputName];

    setErrors({ ...errors });

    formData[inputName] = input.value as unknown as IRegister[keyof IRegister];

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
      await RegisterUser(formData);
      toast.success(`Check your email!`);
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
      });
    } catch (error: any) {
      error.response.data.message && console.log(error.response.data.message);
    }
  };

  console.log(formData);

  return (
    <Container>
      <BackgroundStyle>
        <Background />
      </BackgroundStyle>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <p style={{ color: "green" }}>
          {" "}
          {response && <> {response.message} </>}{" "}
        </p>
        <Form onSubmit={handleSubmit}>
          <Input
            name="firstname"
            placeholder="First name"
            onChange={handleChange}
            value={formData.firstname}
          />

          {errors["firstname"] && <ErrorMsg>{errors["firstname"]}</ErrorMsg>}
          <Input
            name="lastname"
            placeholder="Last name"
            onChange={handleChange}
            value={formData.lastname}
          />
          {errors["lastname"] && <ErrorMsg>{errors["lastname"]}</ErrorMsg>}
          <Input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
          />
          {errors["email"] && <ErrorMsg>{errors["email"]}</ErrorMsg>}
          <Input
            name="phone"
            placeholder="Phone number"
            onChange={handleChange}
            value={formData.phone}
          />
          {errors["phone"] && <ErrorMsg>{errors["phone"]}</ErrorMsg>}
          <Input
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            value={formData.password}
          />
          {errors["password"] && <ErrorMsg>{errors["password"]}</ErrorMsg>}
          <BottomStyle>
            <Link onClick={() => navigate("/login")}>
              Already have an account ?
            </Link>

            <Button type="submit">REGISTER</Button>
          </BottomStyle>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;

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
  position: absolute;
  align-items: center;
  justify-content: center;
  z-index: -1;
`;

const Wrapper = styled.div`
  border-radius: 1rem;
  width: 30%;
  padding: 20px;
  background-color: white;
  box-shadow: -3px -3px 9px #70a3ff, 3px 3px 7px #f61dff;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border: none;
  border-bottom: 1px solid black;
  /* border: none;
  border-bottom: 1px solid black; */

  ::placeholder {
    text-align: center;
    text-transform: uppercase;
  }

  :focus {
    outline: none;
    text-align: center;
  }
`;

const BottomStyle = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  ${mobile({ flexDirection: "column" })}
`;
const Link = styled.span`
  margin: 5px 0px;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
`;

const Button = styled.button`
  border: none;
  padding: 15px 20px;
  background-color: var(--primary);
  border-radius: 1rem;
  color: white;
  cursor: pointer;
`;
