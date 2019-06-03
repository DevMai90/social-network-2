import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addJob } from '../../actions/job';

const AddJob = ({ addJob }) => {
  return (
    <div>
      <h1>adasda</h1>
      <p>234r4tgf</p>
    </div>
  );
};

AddJob.propTypes = {
  addJob: PropTypes.func.isRequired
};

export default connect(
  null,
  { addJob }
)(AddJob);
