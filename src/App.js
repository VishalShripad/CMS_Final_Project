import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwtDecode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { logoutUser, SetCurrentUser } from "./actions/authActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Catalog from "./components/channel/Catalog";
import ChannelDetails from "./components/channel/ChannelDetails";
import ChannelCart from "./components/cart/ChannelCart";
import Payment from "./components/payment/Payment";
import Plans from "./components/plan/Plans";
import PlanDetail from "./components/plan/PlanDetail";
import Profile from './components/user/Profile';
import PrivateRoute from './utils/PrivateRoute';
import UpdateUser from './components/user/UpdateUser';
import { GetCartItems } from "./actions/cartActions";
import ChangePassword from './components/user/ChangePassword';
import EmailForResetPassword from './components/auth/EmailForResetPassword';
import ResetPassword from './components/auth/ResetPassword';
import Vendors from './components/admin/Vendors';
import UserData from './components/admin/UserData';
import UserPlan from './components/admin/UserPlan';

//check for token
if (localStorage.jwtToken) {
  // set auth token heade auth
  console.log("in app jwt token checking");
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info
  const decoded = jwtDecode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(SetCurrentUser(decoded)); // we can call anything any action from store.dispatch
  store.dispatch(GetCartItems());
  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout the user
    store.dispatch(logoutUser);
    // clear current profile
    // redirect to login
    window.location.href = "/login";
  }
}
console.log(localStorage.jwtToken);

class App extends Component {
  render() {
    console.log("In app");
    return (
      <>
        <Provider store={store}>
          <Router>
            <div className="App">
              <Navbar />
              <ToastContainer
                position="bottom-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              <Route exact path="/" component={Landing} />
              <div className="container">
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/channels" component={Catalog} />
                <Route exact path="/channel/:id" component={ChannelDetails} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route
                  exact
                  path="/forget-password"
                  component={EmailForResetPassword}
                />
                <Route exact path="/reset-password" component={ResetPassword} />
                <PrivateRoute exact path="/me" component={Profile} />
                <PrivateRoute exact path="/me/update" component={UpdateUser} />
                <PrivateRoute exact path="/cart" component={ChannelCart} />
                <PrivateRoute exact path="/payment/:id" component={Payment} />
                <PrivateRoute exact path="/plans" component={Plans} />
                <PrivateRoute exact path="/plan/:id" component={PlanDetail} />
                <PrivateRoute
                exact
                path="/changePassword"
                component={ChangePassword}
                />
                <PrivateRoute
                exact
                isAdmin={true}
                path="/admin/vendors"
                component={Vendors}
              />
              <PrivateRoute
                exact
                isAdmin={true}
                path="/admin/userdata"
                component={UserData}
              />
              <PrivateRoute
                exact
                isAdmin={true}
                path="/admin/user/:id"
                component={UserPlan}
              />
              </div>
              <Footer />
            </div>
          </Router>
        </Provider>
      </>
    );
  }
}

export default App;
