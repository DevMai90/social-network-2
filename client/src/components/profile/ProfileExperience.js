import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

const ProfileExperience = ({
  experience: { company, title, to, from, description }
}) => {
  return (
    <div>
      <h3 className="text-dark">{company}</h3>
      <p>
        <Moment format="MM/DD/YY">{moment.utc(from)}</Moment> -{' '}
        {!to ? 'Now' : <Moment format="MM/DD/YY">{moment.utc(to)}</Moment>}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
      </p>
      {description && (
        <p>
          <strong>Description: </strong>
          {description}
        </p>
      )}
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired
};

export default ProfileExperience;
