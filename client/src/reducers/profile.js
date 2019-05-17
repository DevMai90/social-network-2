import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  GET_EXPERIENCE,
  UPDATE_EXPERIENCE,
  UPDATE_EDUCATION,
  GET_EDUCATION
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
  experience: {},
  education: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
    case UPDATE_EXPERIENCE:
    case UPDATE_EDUCATION:
      return {
        ...state,
        profile: payload,
        loading: false,
        experience: {},
        education: {}
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
    case GET_EDUCATION:
      return {
        ...state,
        education: payload,
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
    default:
      return state;
  }
}
