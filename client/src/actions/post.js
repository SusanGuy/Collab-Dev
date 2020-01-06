import * as actionTypes from "./actionTypes";
import axios from "axios";
import { setAlert } from "./alert";

export const getPosts = () => {
  return async dispatch => {
    try {
      const res = await axios.get("/posts");
      dispatch({
        type: actionTypes.GET_POSTS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: actionTypes.PROFILE_ERROR,
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
        type: actionTypes.PROFILE_ERROR,
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
        type: actionTypes.PROFILE_ERROR,
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
      const res = await axios.delete(`/posts/${id}`);
      dispatch({
        type: actionTypes.DELETE_POST,
        payload: id
      });
      dispatch(setAlert("Post Removed", "success"));
    } catch (err) {
      dispatch({
        type: actionTypes.PROFILE_ERROR,
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
        type: actionTypes.PROFILE_ERROR,
        payload: {
          msg: err.response.data.msg,
          status: err.response.status
        }
      });
    }
  };
};
