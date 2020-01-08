import React from "react";
import Alert from "./components/layout/Alert";
import PropTypes from "prop-types";

const Aux = ({ children }) => {
  return (
    <section className="container">
      <Alert />
      {children}
    </section>
  );
};
Aux.prototype = {
  alerts: PropTypes.array.isRequired
};

export default Aux;
