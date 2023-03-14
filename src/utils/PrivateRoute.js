import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Role } from './enum';

const PrivateRoute = ({ isAdmin, component: Component, auth, ...rest }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => {
    console.log("In PrivateRoute useSelector isAuthenticated, loading, user");
    return state.auth
  });
  console.log("In PrivateRoute "+isAdmin+"  "+auth+" "+rest);
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log("In PrivateRoute render "+props);
        if (isAuthenticated === false) {
          return <Redirect to="/login" />;
        }

        if (isAdmin === true && user.role !== Role.Admin) {
          return <Redirect to="/" />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
