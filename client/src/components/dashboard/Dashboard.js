import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfile, deleteProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = ({
  getProfile,
  deleteProfile,
  auth: { user },
  profile: { profile, error, loading }
}) => {
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (profile === null) {
    if (error && !loading) {
      return (
        <Fragment>
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Welcome {user && user.name}
          </p>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      );
    } else {
      return <Spinner />;
    }
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      <DashboardActions />
      <Experience experience={profile.experiences} />
      <Education education={profile.education} />
      <div className="my-2">
        <button className="btn btn-danger" onClick={() => deleteProfile()}>
          <i className="fas fa-user-minus" /> Delete My Account
        </button>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getProfile: PropTypes.func.isRequired,
  deleteProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { auth: state.auth, profile: state.profile };
};

export default connect(mapStateToProps, {
  getProfile,
  deleteProfile
})(Dashboard);
