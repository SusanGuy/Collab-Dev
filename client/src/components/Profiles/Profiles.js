import React, { Fragment, useEffect } from "react";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem";

const Profiles = ({ profile: { profiles, loading }, getAllProfiles }) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);
  if (loading === true || profiles.length === 0) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with
        developers
      </p>
      <div className="profiles">
        {profiles.length > 0 ? (
          profiles.map(profile => {
            return <ProfileItem key={profile._id} profile={profile} />;
          })
        ) : (
          <h4> No Profiles Found... </h4>
        )}
      </div>
    </Fragment>
  );
};

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getAllProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
