import React, { Suspense, lazy, useState, useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import Carousel from "./components/carousel/Carousel";
import Nav from "./components/nav/Nav";
import styled from "styled-components";
import Footer from "./components/footer/Footer";
import { HelmetProvider } from "react-helmet-async";
import HelmetTemplate from "./components/helmetTemplate";
import "./App.scss";

const ShoppingCart = lazy(() => import("./components/shopping/ShoppingCart"));
const Search = lazy(() => import("./components/search/Search"));
const SignUp = lazy(() => import("./components/auth/Signup"));
const LogIn = lazy(() => import("./components/auth/Login"));
const LogOut = lazy(() => import("./components/auth/logout"));
const Order = lazy(() => import("./components/order/Order"));
const OrderDetail = lazy(() => import("./components/order/OrderDetail"));
const Admin = lazy(() => import("./components/admin/admin"));
const Error = lazy(() => import("./components/errors/error"));
const ProductList = lazy(() => import("./components/items/ProductList"));

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
  let history = useHistory();
  const [locations, setLocations] = useState([history.location.key]);
  const [positions, setPositions] = useState({});
  const [documentHeight, setDocumentHeight] = useState(0);
  const resizeObserver = new ResizeObserver((e) =>
    setDocumentHeight(e[0].target.offsetHeight)
  );
  resizeObserver.observe(document.body);

  useEffect(() => {
    return history.listen((location) => {
      if (history.action === "PUSH") {
        const pageDownBy = window.pageYOffset;
        setPositions((prev) => {
          return { ...prev, [locations[0]]: pageDownBy };
        });
        setLocations([location.key]);
      }

      if (history.action === "POP") {
        if (locations[1] === location.key) {
          setLocations(([_, ...keys]) => keys);
        } else {
          setLocations((keys) => [location.key, ...keys]);
        }
      }
    });
  }, [locations]);

  useEffect(() => {
    if (documentHeight >= positions[history.location.key]) {
      scrollTo(0, positions[history.location.key]);
    }
  }, [documentHeight]);

  return (
    <HelmetProvider>
      <HelmetTemplate
        subTitle=""
        des="An E-commerce store selling you best childhood memories with the beloved Mario Brothers."
      />
      <div className="App">
        <Nav isAuthenticated={isAuthenticated} />
        <Suspense fallback={<div></div>}>
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
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              </Route>

              <Route path="/login">
                <LogIn
                  setUsername={setUsername}
                  isAuthenticated={isAuthenticated}
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
        </Suspense>
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
