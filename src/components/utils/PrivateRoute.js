import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const PrivateRoute = ({ component: Component, ...rest }) => {
  let now = Date.now() / 1000
  return (
    <Route {...rest} render={(props) => {
      if (localStorage.getItem('token')) {
        return <Component {...props}/>
      } else {
        return <Redirect to="/signin" />
      }}}
    />
  );
};

export default PrivateRoute;