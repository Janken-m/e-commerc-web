import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const quantity = useSelector((state: any) => state.entities.cart.quantity);
  const user = useSelector((state: any) => state.entities.user);
  const handleLogout = async () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  console.log(user);
  console.log(user.currentUser);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language></Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <AiOutlineSearch style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo onClick={() => navigate("/")}>LOGO.</Logo>
        </Center>
        <Right>
          {user.currentUser ? (
            <p className="signin">{user.currentUser.firstname}</p>
          ) : (
            <button className="signin" onClick={() => navigate("/login")}>
              SIGN IN
            </button>
          )}
          {user?.currentUser ? (
            <MenuItem>
              <img src={user.currentUser.image} />
            </MenuItem>
          ) : (
            <MenuItem onClick={() => navigate("/register")}>REGISTER</MenuItem>
          )}
          {user.currentUser && (
            <MenuItem onClick={() => handleLogout()}> Logout </MenuItem>
          )}
          <Link to="/cart">
            <MenuItem onClick={() => navigate("/cart")}>
              <AiOutlineShoppingCart size={25} color={"black"} />
              <span> {quantity >= 1 ? <> {quantity} </> : <></>} </span>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  font-weight: bold;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  border-radius: var(--Radius);
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ::placeholder {
    text-align: center;
  }

  :focus {
    outline: none;
    text-align: center;
  }
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  cursor: pointer;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-weight: bold;

  button {
    margin-left: 1rem;
  }
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin: 0.7rem;
  position: relative;
  align-items: center;

  span {
    position: absolute;
    color: black;
    border-radius: 50%;
    width: 5%;
    height: 5%;
    top: -20%;
    right: -15%;
    text-align: center;
  }

  img {
    width: 40px;
    height: 40px;
  }
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
