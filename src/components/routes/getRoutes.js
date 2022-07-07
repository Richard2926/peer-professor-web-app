import PrivateRoute from "components/routes/PrivateRoute";
import routes from "components/routes/routes";
import { Route } from "react-router-dom";
import { Outlet } from "react-router-dom";

export const getRoutes = (layout, nested, props) => {
  return routes.map((prop, key) => {
    const nestPath = nested ? prop.path.substring(1) : prop.layout + prop.path;

    if (prop.layout === layout) {
      if ((prop.protected || prop.private) && !nested) {
        return (
          <Route
            key={key}
            path={nestPath}
            element={
              <PrivateRoute
                isVerifying={props.isVerifying}
                isAuthenticated={
                  prop.private ? props.isAuthenticated : !props.isAuthenticated
                }
                redirect={prop.redirect}
              />
            }
          >
             <Route
              key={key}
              path={nestPath}
              element={<prop.element {...props} />}
            />
          </Route> 
        );
      } else {
        return (
          <Route
            key={key}
            path={nestPath}
            element={<prop.element {...props} />}
          />
        );
      }
    }
  });
};
