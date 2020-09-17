import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ children, ...rest }) {
  const token = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={() => (token ? children : <Redirect to={{ path: '/' }} />)}
    />
  );
}

export default PrivateRoute;
