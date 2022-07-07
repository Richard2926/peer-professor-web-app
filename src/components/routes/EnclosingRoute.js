import React, { useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";

const EnclosingRoute = (props) => {
  return props.isVerifying ? (
    <div />
  ) : props.isAuthenticated ? (
    <props.component {...props} user={props.user}>
      <Outlet />
    </props.component>
  ) : (
    <Navigate to={props.redirect} />
  );
};

// const EnclosingRoute = (props) => {
//   return props.isVerifying ? <div className="text-3xl"> Loading </div> : <Temp {...props} />;
// };

const Temp = (props) => {
  const navigate = useNavigate();
  const [prevent, setPrevent] = useState(true);
  const stay = !props.animate;

  useEffect(() => {
    if (!props.isAuthenticated && prevent) {
      navigate(props.redirect);
      setPrevent(false);
    }
  });

  // Animate on refresh
  // Personal note: Conditional branching does not trigger exit animation which is why animate controls when unauthorized routes can be rendered.
  // console.log("Authentication ", props.isAuthenticated, "Animate", props.animate, "Layout", props.layout);
  if (!props.isAuthenticated && !props.animate) {
    //Non application guided access
    return <Navigate to={props.redirect} />;
  }

  return (
    <motion.div
      initial={{ opacity: stay ? 1 : 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: stay ? 1 : 0 }}
    >
      <props.component user={props.user} {...props}>
        <Outlet />
      </props.component>
    </motion.div>
  );
};

function mapStateToProps(state) {
  return {
    animate: state.auth.animate,
  };
}

export default connect(mapStateToProps)(EnclosingRoute);
