import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  GET_EXPERIENCE,
  UPDATE_EXPERIENCE,
  GET_EDUCATION,
  UPDATE_EDUCATION,
  DELETE_RESUME
} from './types';

// Get current user's profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get('/api/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get profile by ID
export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Github repos
export const getGithubRepos = username => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create or update profile
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    if (edit) {
      history.push('/dashboard');
    }

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
  // Need Content-Type because we are SENDING data
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('/api/profile/experience', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Education
export const addEducation = (formData, history) => async dispatch => {
  // Need Content-Type because we are SENDING data
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('/api/profile/education', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Experience
export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Education
export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Experience by ID
export const getExperience = id => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/experience/${id}`);
    dispatch({
      type: GET_EXPERIENCE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Education by ID
export const getEducation = id => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/education/${id}`);
    dispatch({
      type: GET_EDUCATION,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update Experience by ID
export const updateExperience = (formData, history, id) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.put(
      `/api/profile/experience/${id}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_EXPERIENCE,
      payload: res.data
    });

    history.push('/dashboard');

    dispatch(setAlert('Experience Updated', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update Education by ID
export const updateEducation = (formData, history, id) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.put(
      `/api/profile/education/${id}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_EDUCATION,
      payload: res.data
    });

    history.push('/dashboard');

    dispatch(setAlert('Experience Updated', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Account and Profile
export const deleteAccount = () => async dispatch => {
  try {
    await axios.delete('/api/profile');

    dispatch({
      type: CLEAR_PROFILE
    });

    dispatch({
      type: ACCOUNT_DELETED
    });

    dispatch(setAlert('You account has been permanently deleted'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Upload Resume
export const uploadResume = formData => async dispatch => {
  try {
    const res = await axios.post('/api/profile/resume', formData);

    res.send();

    console.log(res);
  } catch (err) {
    console.log(err);
  }
  // try {
  //   const config = {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   };

  //   // const formData = new FormData(resume);
  //   // formData.append('text', resume.text);
  //   // formData.append('resume', resume.resume);

  //   const res = await axios.post('/api/profile/resume', formData, config);

  //   console.log('Test1');
  //   console.log(res);
  //   dispatch({
  //     type: UPDATE_PROFILE,
  //     payload: res.data
  //   });

  //   dispatch(setAlert('Your resume has been uploaded'));
  // } catch (err) {
  //   // dispatch({
  //   //   type: PROFILE_ERROR,
  //   //   payload: { msg: err.response.statusText, status: err.response.status }
  //   // });
  //   console.log(err);
  // }
};

// Delete Resume
export const deleteResume = () => async dispatch => {
  try {
    const res = await axios.delete('/api/profile/resume');

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Your resume has been deleted'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
