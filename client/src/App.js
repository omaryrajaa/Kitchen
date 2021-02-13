import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "./context/auth";
import withRoot from "./modules/withRoot";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUpCustomer from "./pages/SignUpCustomer";
import SignUpCaterer from "./pages/SignUpCaterer";
import SignUpDelivery from "./pages/SignUpDelivery";
import Dashboard from "./components/caterer/Dashboard";
import TodayMenu from "./components/caterer/TodayMenu";
import FullMenu from "./components/caterer/FullMenu";
import OrdersHistory from "./components/caterer/OrdersHistory";
import OrderDetails from "./components/caterer/OrderDetails";
import ItemsByName from "./components/landing/ItemsByName";
import MenuItemDetails from "./components/MenuItemDetails";
import ItemsByCategory from "./components/landing/ItemsByCategory";
import CatererTodayDishes from "./components/CatererTodayDishes";
import LoginCustomer from "./pages/LoginCustomer";
import Cart from "./components/customer/Cart";
import Checkout from "./components/customer/Checkout";
import CaterersList from "./components/CaterersList";

function App(props) {
  const [authTokens, setAuthTokens] = useState();

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/login-customer" component={LoginCustomer} />
          <Route path="/signup-customer" component={SignUpCustomer} />
          <Route path="/signup-caterer" component={SignUpCaterer} />
          <Route path="/signup-delivery" component={SignUpDelivery} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/today-menu" component={TodayMenu} />
          <PrivateRoute path="/full-menu" component={FullMenu} />
          <PrivateRoute path="/orders-history" component={OrdersHistory} />
          <PrivateRoute path="/order-details" component={OrderDetails} />
          <PrivateRoute path="/cart" component={Cart} />
          <PrivateRoute path="/checkout" component={Checkout} />
          <Route path="/items-by-name" component={ItemsByName} />
          <Route path="/dish-details" component={MenuItemDetails} />
          <Route path="/items-by-category" component={ItemsByCategory} />
          <Route path="/caterer-dishes" component={CatererTodayDishes} />
          <Route path="/caterers-list" component={CaterersList} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default withRoot(App);
