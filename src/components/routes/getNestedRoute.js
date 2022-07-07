import { Route, Routes } from "react-router-dom";
import DualRoute from "components/routes/DualRoute";
import { getRoutes } from "components/routes/getRoutes";
import PrivateRoute from "components/routes/PrivateRoute";
import EnclosingRoute from "components/routes/EnclosingRoute";
import Explore from "pages/home/Explore";

export const getNestedRoute = (layout, props, encloser, stray, redirect) => {
  return (
    <Route
      path={layout}
      element={
        <EnclosingRoute
          {...props}
          layout={layout}
          redirect={redirect}
          component={encloser}
        />
      }
    >
      {getRoutes(layout, true, props)}
      <Route
        exact path="*"
        element={
          <DualRoute isVerifying={props.isVerifying} isAuthenticated={false} alternate={stray} />
        }
      />
    </Route>
  );
};
