import * as actionTypes from "./actionTypes";
import axios from "axios";
import { setAlert } from "./alert";

export const getPosts = () => {
  return async dispatch => {
    dispatch({
      type: actionTypes.ClEAR_PROFILE
    });
    try {
      const res = await axios.get("/posts");
      dispatch({
        type: actionTypes.GET_POSTS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: actionTypes.POST_ERROR,
        payload: {
          msg: err.response.data.msg,
          status: err.response.status
        }
      });
    }
  };
};

export const getPost = id => {
  return async dispatch => {
    try {
      const res = await axios.get(`/posts/${id}`);
      dispatch({
        type: actionTypes.GET_POST,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: actionTypes.POST_ERROR,
        payload: {
          msg: err.response.data.msg,
          status: err.response.status
        }
      });
    }
  };
};

export const addLikes = id => {
  return async dispatch => {
    try {
      const res = await axios.put(`/posts/like/${id}`);

      dispatch({
        type: actionTypes.UPDATE_LIKES,
        payload: { id, likes: res.data }
      });
    } catch (err) {
      dispatch({
        type: actionTypes.POST_ERROR,
        payload: {
          msg: err.response.data.msg,
          status: err.response.status
        }
      });
    }
  };
};

export const removeLikes = id => {
  return async dispatch => {
    try {
      const res = await axios.put(`/posts/unlike/${id}`);
      dispatch({
        type: actionTypes.UPDATE_LIKES,
        payload: { id, likes: res.data }
      });
    } catch (err) {
      dispatch({
        type: actionTypes.POST_ERROR,
        payload: {
          msg: err.response.data.msg,
          status: err.response.status
        }
      });
    }
  };
};

export const deletePost = id => {
  return async dispatch => {
    try {
      await axios.delete(`/posts/${id}`);
      dispatch({
        type: actionTypes.DELETE_POST,
        payload: id
      });
      dispatch(setAlert("Post Removed", "success"));
    } catch (err) {
      dispatch({
        type: actionTypes.POST_ERROR,
        payload: {
          msg: err.response.data.msg,
          status: err.response.status
        }
      });
    }
  };
};

export const addPost = formData => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const res = await axios.post(`/posts`, formData, config);
      dispatch({
        type: actionTypes.ADD_POST,
        payload: res.data
      });
      dispatch(setAlert("Post Created", "success"));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => {
          return dispatch(setAlert(error.msg, "danger"));
        });
      }
      dispatch({
        type: actionTypes.POST_ERROR,
        payload: {
          msg: err.response.data.msg,
          status: err.response.status
        }
      });
    }
  };
};

export const addComment = (postId, formData) => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const res = await axios.post(
        `/posts/comment/${postId}`,
        formData,
        config
      );
      dispatch({
        type: actionTypes.ADD_COMMENT,
        payload: res.data
      });
      dispatch(setAlert("Comment Added", "success"));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => {
          return dispatch(setAlert(error.msg, "danger"));
        });
      }
      dispatch({
        type: actionTypes.POST_ERROR,
        payload: {
          msg: err.response.data.msg,
          status: err.response.status
        }
      });
    }
  };
};

export const deleteComment = (postId, commentId) => {
  return async dispatch => {
    try {
      await axios.delete(`/posts/comment/${postId}/${commentId}`);
      dispatch({
        type: actionTypes.REMOVE_COMMENT,
        payload: commentId
      });
      dispatch(setAlert("Comment Removed", "success"));
    } catch (err) {
      dispatch({
        type: actionTypes.POST_ERROR,
        payload: {
          msg: err.response.data.msg,
          status: err.response.status
        }
      });
    }
  };
};
