import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { connect } from "react-redux";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import { getUserProfile } from "../../actions/profile";

const Profile = ({
  match,
  getUserProfile,
  profile: { profile, loading },
  auth
}) => {
  useEffect(() => {
    getUserProfile(match.params.id);
  }, [getUserProfile]);
  if (loading || profile === null) {
    return <Spinner />;
  }
  return (
    <Fragment>
      <Link to="/profile" className="btn btn-light">
        Back To Profiles
      </Link>
      {auth.isAuthenticated &&
        auth.loading === false &&
        auth.user._id === profile.user._id && (
          <Link to="/edit-profile" className="btn btn-dark">
            Edit Profile
          </Link>
        )}
      <div className="profile-grid my-1">
        <ProfileTop profile={profile} />
        <ProfileAbout profile={profile} />
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile,
    auth: state.auth
  };
};
export default connect(mapStateToProps, {
  getUserProfile
})(Profile);
