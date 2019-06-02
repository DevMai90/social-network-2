import React, { Fragment } from 'react';
import JobItem from './JobItem';

const Jobs = props => {
  return (
    <Fragment>
      <h1 className="large text-primary">Job Board</h1>
      <p className="lead">
        <i className="far fa-list-alt" /> Browse and see our list of
        opportunities
      </p>
      <JobItem />
    </Fragment>
  );
};

export default Jobs;
