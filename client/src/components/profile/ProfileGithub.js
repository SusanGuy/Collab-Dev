import React, { useEffect } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import GithubRep from "./GithubRepo";
import { getRepos } from "../../actions/profile";

const ProfileGithub = ({ username, getRepos, repos, loading }) => {
  useEffect(() => {
    getRepos(username);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">
        <i className="fab fa-github"></i> Github Repos
        {repos.length === 0 ? (
          <h1
            style={{
              fontSize: "14px",
              fontDecoration: "none",
              color: "black"
            }}
          >
            No repos found..
          </h1>
        ) : (
          repos.map(repo => {
            return <GithubRep key={repo.id} repo={repo} />;
          })
        )}
      </h2>
    </div>
  );
};

ProfileGithub.propTypes = {
  getRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    repos: state.profile.repos,
    loading: state.profile.loading
  };
};

export default connect(mapStateToProps, { getRepos })(ProfileGithub);
