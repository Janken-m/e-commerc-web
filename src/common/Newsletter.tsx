import { AiOutlineSend } from "react-icons/ai";
import styled from "styled-components";
import { mobile } from "../responsive";

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>subscribe to newsletter, To get all new products</Desc>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <AiOutlineSend />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}
`;

const InputContainer = styled.div`
  width: 20%;
  height: 40px;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid black;
  flex: 8;
  border-radius: var(--Radius);

  ::placeholder {
    text-align: center;
  }

  :focus {
    outline: none;
    text-align: center;
  }
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: var(--primary);
  color: white;
`;
