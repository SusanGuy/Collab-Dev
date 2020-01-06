import React, { useEffect } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import GithubRep from "./GithubRepo";
import { getRepos } from "../../actions/profile";

const ProfileGithub = ({ username, getRepos, repos }) => {
  useEffect(() => {
    getRepos(username);
  }, [getRepos]);

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">
        <i className="fab fa-github"></i> Github Repos
        {repos.map(repo => {
          return <GithubRep key={repo.id} repo={repo} />;
        })}
      </h2>
    </div>
  );
};

ProfileGithub.propTypes = {
  getRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    repos: state.profile.repos
  };
};

export default connect(mapStateToProps, { getRepos })(ProfileGithub);
