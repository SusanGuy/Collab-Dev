import * as actionTypes from "./actionTypes";
import axios from "axios";

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
