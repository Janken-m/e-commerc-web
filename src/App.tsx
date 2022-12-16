import Login from "./components/Login";
import Register from "./components/Register";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import Product from "./components/Product";
import Success from "./common/Success";
import ForgetPassword from "./common/ForgetPassword";
import Activation from "./common/Activation";

function App() {
  return (
    <div>
      <Routes>
        <Route path="//products/:category" element={<ProductList />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/activate/:id" element={<Activation />} />
        <Route path="/products/" element={<ProductList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/success" element={<Success />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
