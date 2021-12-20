/* ************************************************************************
 * Execution        : cmd> node index.js
 * @descrition      : Routes File
 * @file            : route.js
 * @author          : Dhruv Shetty
 * @version         : 1.0
 * @since           : 8-Dec-2021
 *
 **************************************************************************/
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Registeration from "./pages/RegisterationPage";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassWord from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";

const Routes = () => {
  return (
    <Router>
      <Route path="/" exact component={Registeration} />
      <Route path="/login" component={Login} />
      <Route path="/forgot" component={ForgetPassword} />
      <Route path="/reset/:token" component={ResetPassWord} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/cart" component={CartPage} />
      <Route path="/order" component={OrderPage} />
    </Router>
  );
};

export default Routes;