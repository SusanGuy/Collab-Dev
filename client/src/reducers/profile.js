import * as actionTypes from "../actions/actionTypes";
const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_PROFILE:
    case actionTypes.UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
        error: null
      };
    case actionTypes.GET_GITHUB_PROFILE:
      return {
        ...state,
        repos: payload,
        loading: false
      };
    case actionTypes.GITHUB_PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case actionTypes.PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      };

    case actionTypes.GET_ALL_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };

    case actionTypes.ClEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
        error: null
      };

    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
}
