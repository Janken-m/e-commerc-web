import { useSelector } from "react-redux";
import { IoMdRemoveCircle, IoIosAddCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { addProduct, removeProduct, deleteProduct } from "../store/Cart";
import styled from "styled-components";
import { mobile } from "../responsive";
import Footer from "../common/Footer";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";
import { Iproduct } from "../types/productType";
import Navbar from "./Navbar";
import Announcement from "../common/Announcement";
const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.entities.cart);
  const totalPrice = cart
    .map((item: any) => item.price * item.quantity)
    .reduce(
      //@ts-ignore
      (totalPrice, totalQuantity) => totalPrice + totalQuantity,
      0
    );

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>YOUR CART</Title>
        <Top>
          <>CONTINUE SHOPPING</>
          <TopTexts>
            <TopText>Shopping Bag{cart.total}</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {cart.map((product: Iproduct) => (
              <Product>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductId>
                      <b>ID:</b> {product.id}
                    </ProductId>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <MdRemoveCircle
                      size={20}
                      onClick={() => dispatch(removeProduct(product))}
                    />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <MdAddCircle
                      size={20}
                      onClick={() => dispatch(addProduct(product))}
                    />
                    <RemoveQuqntity>
                      <Button onClick={() => dispatch(deleteProduct(product))}>
                        {" "}
                        Remove{" "}
                      </Button>
                    </RemoveQuqntity>
                  </ProductAmountContainer>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>SEK {totalPrice}</SummaryItemPrice>
            </>
            <>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>SEK 50.90</SummaryItemPrice>
            </>
            <>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>SEK -50.90</SummaryItemPrice>
            </>
            <SummaryItem>
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>SEK {cart.total}</SummaryItemPrice>
            </SummaryItem>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
`;

const TopTexts = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  padding: 0.5rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const RemoveQuqntity = styled.div`
  display: flex;
  padding: 1rem;
`;

const Button = styled.button`
  background-color: black;
  color: white;
`;
