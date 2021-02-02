
import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import { AuthContext} from './context/auth';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './components/caterer/Dashboard';
import TodayMenu from './components/caterer/TodayMenu';
import FullMenu from './components/caterer/FullMenu';
import OrdersHistory from './components/caterer/OrdersHistory';
import OrderDetails from './components/caterer/OrderDetails';


function App(props) {
  const [authTokens, setAuthTokens] = useState();
  
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
   
    <Router>
      <div>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/today-menu" component={TodayMenu} />
          <PrivateRoute path="/full-menu" component={FullMenu} />
          <PrivateRoute path="/orders-history" component={OrdersHistory} />
          <PrivateRoute path="/order-details" component={OrderDetails} />

      </div>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;

