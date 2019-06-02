import axios from 'axios';
import { GET_JOBS, JOB_ERROR } from './types';

export const getJobs = () => async dispatch => {
  try {
    const res = await axios.get('/api/jobs');

    dispatch({
      type: GET_JOBS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
