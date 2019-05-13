import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  GET_EXPERIENCE,
  UPDATE_EXPERIENCE
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
  experience: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
    case UPDATE_EXPERIENCE:
      return {
        ...state,
        profile: payload,
        loading: false,
        experience: {}
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case GET_EXPERIENCE:
      return {
        ...state,
        experience: payload,
        loading: false
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        reports: [],
        loading: false,
        experience: {}
      };
    // return {
    //   ...state,

    //   experience: {},
    //   loading: false
    //   // WORK HERE
    // };
    default:
      return state;
  }
}
