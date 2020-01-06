import axios from "axios";
import * as actionTypes from "./actionTypes";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => {
  return async dispatch => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get("/auth");

      dispatch({
        type: actionTypes.USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: actionTypes.AUTH_ERROR
      });
    }
  };
};

export const register = ({ name, email, password }) => {
  return async dispatch => {
    dispatch({
      type: actionTypes.ClEAR_PROFILE
    });
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({ name, email, password });
    try {
      const res = await axios.post("/users", body, config);
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => {
          return dispatch(setAlert(error.msg, "danger"));
        });
      }
      dispatch({
        type: actionTypes.REGISTER_FAIL
      });
    }
  };
};

export const login = (email, password) => {
  return async dispatch => {
    dispatch({
      type: actionTypes.ClEAR_PROFILE
    });
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post("/auth", body, config);
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: {
          token: res.data.token
        }
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => {
          return dispatch(setAlert(error.msg, "danger"));
        });
      }
      dispatch({
        type: actionTypes.LOGIN_FAIL
      });
    }
  };
};

export const logout = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.LOGOUT
    });
    dispatch({
      type: actionTypes.ClEAR_PROFILE
    });
  };
};
