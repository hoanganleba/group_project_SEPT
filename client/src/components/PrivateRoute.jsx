import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthApi from "../AuthApi";


function PrivateRoute({ children, ...rest }) {
    const Auth = React.useContext(AuthApi);
  return (
    <Route
      {...rest}
      render={() =>
        Auth.auth ? (
          children
        ) : (
          <Redirect to={{ path: "/" }} />
        )
      }
    />
  );
}

export default PrivateRoute;
