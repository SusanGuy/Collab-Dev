import React, { Fragment, useEffect } from "react";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem";
import Aux from "../../Aux";

const Profiles = ({
  profile: { profiles, loading, error },
  getAllProfiles
}) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);
  if (profiles.length === 0) {
    if (error && !loading) {
      return (
        <Aux>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with
            developers
          </p>
          <div className="profiles">
            <h4>No Profile found ...</h4>
          </div>
        </Aux>
      );
    } else {
      return <Spinner />;
    }
  }

  return (
    <Aux>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with
        developers
      </p>
      <div className="profiles">
        {profiles.map(profile => {
          return <ProfileItem key={profile._id} profile={profile} />;
        })}
      </div>
    </Aux>
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
