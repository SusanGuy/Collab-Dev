import React, { Fragment, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { connect } from "react-redux";
import ProfileTop from "./ProfileTop";
import ProfileGithub from "./ProfileGithub";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import { getUserProfile } from "../../actions/profile";

const Profile = ({
  match,
  getUserProfile,
  profile: { profile, error, loading },
  auth,
  location
}) => {
  useEffect(() => {
    getUserProfile(match.params.id);
  }, [getUserProfile]);

  if (profile === null) {
    if (error) {
      return (
        <Fragment>
          <p>No profile added yet ...</p>
          {loading === false && auth.user._id === location.id && (
            <Link to="/create-profile" className="btn btn-dark">
              Add Profile
            </Link>
          )}
        </Fragment>
      );
    } else {
      return <Spinner />;
    }
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
        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
          {profile.experiences.length > 0 ? (
            <Fragment>
              {profile.experiences.map(exp => {
                return <ProfileExperience key={exp._id} experience={exp} />;
              })}
            </Fragment>
          ) : (
            <Fragment>
              <h4>"No experience info yet ..."</h4>
              {auth.isAuthenticated &&
                auth.loading === false &&
                auth.user._id === profile.user._id && (
                  <Link to="/add-experience" className="btn btn-dark m-1">
                    Add Experience
                  </Link>
                )}
            </Fragment>
          )}
        </div>

        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
          {profile.education.length > 0 ? (
            <Fragment>
              {profile.education.map(edu => {
                return <ProfileEducation key={edu._id} education={edu} />;
              })}
            </Fragment>
          ) : (
            <Fragment>
              <h4>"No education info yet ..."</h4>
              {auth.isAuthenticated &&
                auth.loading === false &&
                auth.user._id === profile.user._id && (
                  <Link to="/add-education" className="btn btn-dark m-1">
                    Add Education
                  </Link>
                )}
            </Fragment>
          )}
        </div>
        {profile.githubusername && (
          <ProfileGithub username={profile.githubusername} />
        )}
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
