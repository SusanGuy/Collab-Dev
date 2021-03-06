import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getPost } from "../../actions/post";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "../post/CommentForm";
import CommentItem from "../post/CommentItem";
import Aux from "../../Aux";

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);
  if (loading || post === null) {
    return <Spinner />;
  }

  return (
    <div>
      <Fragment>
        <Aux>
          <Link to="/posts" className="btn">
            Go back
          </Link>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <div className="comments">
            {post.comments.map(comment => {
              return (
                <CommentItem
                  key={comment._id}
                  comment={comment}
                  postId={post._id}
                />
              );
            })}
          </div>
        </Aux>
      </Fragment>
    </div>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  return {
    post: state.post
  };
};

export default connect(mapStateToProps, { getPost })(Post);
