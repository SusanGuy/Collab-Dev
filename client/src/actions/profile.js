import axios from "axios";
import { setAlert } from "./alert";
import * as actionTypes from "./actionTypes";

export const getProfile = () => {
  return async dispatch => {
    try {
      const res = await axios.get("/profile/me");

      dispatch({
        type: actionTypes.GET_PROFILE,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PROFILE_ERROR,
        payload: {
          msg: error.response.data.msg,
          status: error.response.status
        }
      });
    }
  };
};

export const createProfile = (formData, history, edit = false) => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios.post("/profile", formData, config);
      dispatch({
        type: actionTypes.GET_PROFILE,
        payload: res.data
      });
      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );

      history.push("/dashboard");
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

export const addExperience = (formData, history) => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios.put("/profile/experience", formData, config);
      dispatch({
        type: actionTypes.UPDATE_PROFILE,
        payload: res.data
      });
      dispatch(setAlert("Experience Added", "success"));

      history.push("/dashboard");
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

export const addEducation = (formData, history) => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios.put("/profile/education", formData, config);
      dispatch({
        type: actionTypes.UPDATE_PROFILE,
        payload: res.data
      });
      dispatch(setAlert("Education Added", "success"));

      history.push("/dashboard");
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
