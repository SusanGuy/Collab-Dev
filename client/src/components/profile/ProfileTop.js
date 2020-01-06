import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({ profile }) => {
  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={profile.user.avatar} alt="" />
      <h1 className="large">{profile.user.name}</h1>
      <p className="lead">
        {profile.status} {profile.company && <span>at {profile.company} </span>}
      </p>
      <p>{profile.location && <span>{profile.location}</span>}</p>
      <div className="icons my-1">
        {profile.website && (
          <a href={profile.website} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x"></i>
          </a>
        )}
        {profile.socials && profile.socials.twitter && (
          <a
            href={`https://www.twitter.com/${profile.socials.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter fa-2x"></i>
          </a>
        )}
        {profile.socials && profile.socials.facebook && (
          <a
            href={`https://www.facebook.com/${profile.socials.facebook}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook fa-2x"></i>
          </a>
        )}
        {profile.socials && profile.socials.linkedin && (
          <a
            href={`https://www.linkedin.com/in/${profile.socials.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
        )}
        {profile.socials && profile.socials.youtube && (
          <a
            href={`https://www.youtube.com/${profile.socials.youtube}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-youtube fa-2x"></i>
          </a>
        )}
        {profile.socials && profile.socials.instagram && (
          <a
            href={`https://www.instagram.com/${profile.socials.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram fa-2x"></i>
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
