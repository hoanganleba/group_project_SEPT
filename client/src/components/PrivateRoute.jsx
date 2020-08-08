import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        cookies.get("jwt-token") ? (
          children
        ) : (
          <Redirect to={{ path: "/", state: { from: location } }} />
        )
      }
    />
  );
}

export default PrivateRoute;
