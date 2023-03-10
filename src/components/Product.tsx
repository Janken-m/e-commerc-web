import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import { useGetProductsQuery } from "../store/Api";
import { Link } from "react-router-dom";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { popularProducts } from "../data";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/Cart";
import { Iproduct } from "../types/productType";

const Products = () => {
  const { data: products } = useGetProductsQuery("products");
  const dispatch = useDispatch();

  return (
    <Wrapper>
      {popularProducts.map((product: Iproduct) => (
        <>
          <Container key={product.id}>
            <Circle />
            <Image src={product.img} />
            <Info>
              <Icon>
                <AiOutlineShoppingCart
                  onClick={() => dispatch(addProduct(product))}
                />
              </Icon>
              <Icon>
                <MdFavoriteBorder />
              </Icon>
            </Info>
          </Container>
        </>
      ))}
    </Wrapper>
  );
};

export default Products;

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  width: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
