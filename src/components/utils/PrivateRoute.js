import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => {
      if (localStorage.getItem('token')) {
        const tokenExp = jwt_decode(localStorage.getItem('token')).exp;
        const now = Date.now() / 1000
        if (now > tokenExp) {
          localStorage.removeItem('token')
          return <Redirect to="/signin" />
        } else {
          return <Component {...props}/>
        }
      } else {
        return <Redirect to="/signin" />
      }}}
    />
  );
};

export default PrivateRoute;