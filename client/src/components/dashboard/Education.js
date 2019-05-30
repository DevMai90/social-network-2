import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';
import PropTypes from 'prop-types';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education, deleteEducation }) => {
  const currentEdu = education
    .filter(item => item.current === true)
    .sort((a, b) => new Date(b.from) - new Date(a.from));

  const pastEdu = education
    .filter(item => item.current === false)
    .sort((a, b) => new Date(b.to) - new Date(a.to));

  const sortedEdu = [...currentEdu, ...pastEdu];

  const educationHistory = sortedEdu.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        <Moment format="MM/DD/YY">{moment.utc(edu.from)}</Moment> -{' '}
        {edu.to === null ? (
          ' Now'
        ) : (
          <Moment format="MM/DD/YY">{moment.utc(edu.to)}</Moment>
        )}
      </td>
      <td>
        <Link to={`/education/${edu._id}`} className="btn btn-dark">
          Edit
        </Link>
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteEducation(edu._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>{educationHistory}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
