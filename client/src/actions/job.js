import axios from 'axios';
import { GET_JOBS, JOB_ERROR, ADD_JOB } from './types';
import { setAlert } from '../actions/alert';

export const getJobs = () => async dispatch => {
  try {
    const res = await axios.get('/api/jobs');

    dispatch({
      type: GET_JOBS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addJob = formData => async dispatch => {
  // Sending data. Need to set headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = axios.post('/api/jobs', formData, config);

    dispatch({
      type: ADD_JOB,
      payload: res.data
    });

    dispatch(setAlert('Job Added', 'success'));
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
