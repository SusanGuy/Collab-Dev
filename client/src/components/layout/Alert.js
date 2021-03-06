import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Aux from "../../Aux";

const Alert = ({ alerts, children }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => {
    return <div className={`alert alert-${alert.alertType}`}>{alert.msg}</div>;
  });

Alert.prototype = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    alerts: state.alert
  };
};

export default connect(mapStateToProps)(Alert);
