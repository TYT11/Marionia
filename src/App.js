import React from "react";
import { Route, Switch } from "react-router-dom";
import Carousel from "./components/carousel/Carousel";
import Nav from "./components/nav/Nav";
import styled from "styled-components";
import ProductList from "./components/items/ProductList";
import Footer from "./components/footer/Footer";
import "./App.scss";
import { useState } from "react";
import ShoppingCart from "./components/shopping/ShoppingCart";
import Search from "./components/search/Search";
import SignUp from "./components/auth/Signup";
import LogIn from "./components/auth/Login";
import LogOut from "./components/auth/logout";
import Order from "./components/order/Order";
import OrderDetail from "./components/order/OrderDetail";
import Admin from "./components/admin/admin";
import Error from "./components/errors/error";
import { HelmetProvider } from "react-helmet-async";
import HelmetTemplate from "./components/helmetTemplate";

const CarouselContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const BodyContainer = styled.div`
  max-width: 85rem;
  margin: 0 auto;
`;

function App() {
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );

  return (
    <HelmetProvider>
      <HelmetTemplate
        subTitle=""
        des="An E-commerce store selling you best childhood memories with the beloved Mario Brothers."
      />
      <div className="App">
        <Nav isAuthenticated={isAuthenticated} />

        <BodyContainer>
          <Switch>
            <Route path="/" exact>
              <CarouselContainer>
                <Carousel />
              </CarouselContainer>
              <ProductList />
            </Route>

            <Route path="/details/:productId">
              <ProductList />
            </Route>

            <Route path="/category/:category">
              <ProductList />
            </Route>

            <Route path="/shopping">
              <ShoppingCart />
            </Route>

            <Route path="/search">
              <Search />
            </Route>

            <Route path="/signup">
              <SignUp
                setUsername={setUsername}
                setIsAuthenticated={setIsAuthenticated}
              />
            </Route>

            <Route path="/login">
              <LogIn
                setUsername={setUsername}
                setIsAuthenticated={setIsAuthenticated}
              />
            </Route>

            <Route path="/logout">
              <LogOut setIsAuthenticated={setIsAuthenticated} />
            </Route>

            <Route path="/checkout">
              <ShoppingCart />
            </Route>
            <Route path="/order">
              <Order />
            </Route>

            <Route path="/orderdetail">
              <OrderDetail />
            </Route>

            <Route path="/manageorder">
              <Admin />
            </Route>

            <Route>
              <Error />
            </Route>
          </Switch>
        </BodyContainer>

        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
