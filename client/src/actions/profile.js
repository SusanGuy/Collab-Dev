import axios from "axios";
import { setAlert } from "./alert";
import { logout } from "./auth";
import * as actionTypes from "./actionTypes";

export const getProfile = () => {
  return async dispatch => {
    dispatch({
      type: actionTypes.SET_LOADING
    });
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

export const deleteExperience = id => {
  return async dispatch => {
    try {
      const res = await axios.delete(`/profile/experience/${id}`);
      dispatch({
        type: actionTypes.UPDATE_PROFILE,
        payload: res.data
      });
      dispatch(setAlert("Experience Deleted", "success"));
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

export const deleteEducation = id => {
  return async dispatch => {
    try {
      const res = await axios.delete(`/profile/education/${id}`);
      dispatch({
        type: actionTypes.UPDATE_PROFILE,
        payload: res.data
      });
      dispatch(setAlert("Education Deleted", "success"));
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

export const deleteProfile = () => {
  return async dispatch => {
    try {
      await axios.delete("/profile/");
      dispatch(logout());
      dispatch(setAlert("Profile Deleted", "success"));
    } catch (err) {
      dispatch({
        type: actionTypes.PROFILE_ERROR,
        payload: {
          msg: err.response.data,
          status: err.response.status
        }
      });
    }
  };
};

export const getAllProfiles = () => {
  return async dispatch => {
    dispatch({
      type: actionTypes.ClEAR_PROFILE
    });
    try {
      const res = await axios.get("/profile/");
      dispatch({
        type: actionTypes.GET_ALL_PROFILES,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PROFILE_ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      });
    }
  };
};

export const getUserProfile = id => {
  return async dispatch => {
    try {
      const res = await axios.get(`/profile/user/${id}`);
      dispatch({
        type: actionTypes.GET_PROFILE,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PROFILE_ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      });
    }
  };
};

export const getRepos = username => {
  return async dispatch => {
    try {
      const res = await axios.get(`/profile/github/${username}`);
      dispatch({
        type: actionTypes.GET_GITHUB_PROFILE,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PROFILE_ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      });
    }
  };
};
