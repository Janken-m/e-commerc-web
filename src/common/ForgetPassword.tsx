import { useState } from "react";
import styled from "styled-components";
import Background from "../components/Login/Background";
import { useNavigate } from "react-router-dom";
import { mobile } from "../responsive";

const ForgetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  return (
    <Container>
      <BackgroundStyle>
        <Background />
      </BackgroundStyle>
      <Wrapper>
        <Title>Change your password</Title>
        <Form>
          <Input
            placeholder="Email Address..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button>Send</Button>
          {/* {error && <Error>Something went wrong...</Error>} */}
          <Link onClick={() => navigate("/login")}>Sign in</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default ForgetPassword;

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
