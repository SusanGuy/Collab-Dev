import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileItem = ({ profile }) => {
  return (
    <Fragment>
      <div className="profile bg-light">
        <img className="round-img" src={profile.user.avatar} alt="" />
        <div>
          <h2>{profile.user.name}</h2>
          <p>
            {profile.status} at {profile.company}
          </p>
          <p className="my-1">
            {profile.location && <span>{profile.location}</span>}
          </p>
          <Link to={`/profile/${profile.user._id}`} className="btn btn-primary">
            View Profile
          </Link>
        </div>

        <ul>
          {profile.skills.map(skill => {
            return (
              <Fragment key={skill}>
                <li className="text-primary">
                  <i className="fas fa-check"></i> {skill}
                </li>
              </Fragment>
            );
          })}
        </ul>
      </div>
    </Fragment>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
