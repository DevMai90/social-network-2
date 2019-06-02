import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const JobItem = ({
  job: {
    user,
    name,
    avatar,
    seniority,
    term,
    position,
    skills,
    description,
    location,
    salary,
    benefits,
    companyName,
    contactName,
    contactInfo,
    availability
  }
}) => {
  return (
    <div className="profile bg-light">
      <h2>
        {position} at {companyName}
      </h2>
    </div>
  );
};

export default JobItem;
