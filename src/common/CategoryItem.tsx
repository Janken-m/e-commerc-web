import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const CategoryItem = ({ item }: any) => {
  return (
    <Container>
      <Link to={`/products/${item.name}`}>
        <Image src={item.image} />
        <Info>
          <Title>{item.name}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  cursor: pointer;
  font-weight: 600;
`;
