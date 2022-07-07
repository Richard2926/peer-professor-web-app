import React from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import DualRoute from "components/routes/DualRoute";
import { getNestedRoute } from "components/routes/getNestedRoute";
import AuthLayout from "components/shared/AuthLayout";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import HomeLayout from "components/home/HomeLayout";
// import { getRoutes } from "components/routes/getRoutes";

function App(props) {
  const location = useLocation();
  // console.log("Verifying:" , props.isVerifying, "Authentication:" , props.isAuthenticated, "User", props.user);
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        {getNestedRoute(
          "/home",
          props,
          HomeLayout,
          "/home/explore",
          "/landing/login"
        )}
        {getNestedRoute(
          "/landing",
          { ...props, isAuthenticated: !props.isAuthenticated },
          AuthLayout,
          "/landing/login",
          "/home/explore"
        )}
        <Route
          path="*"
          element={
            <DualRoute
              isAuthenticated={props.isAuthenticated}
              isVerifying={props.isVerifying}
              redirect="/home/explore"
              alternate="/landing/login"
            />
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying,
    user: state.auth.user,
  };
}

export default connect(mapStateToProps)(App);
