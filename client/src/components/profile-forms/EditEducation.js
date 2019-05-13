import React, { Fragment, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEducation, updateEducation } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const EditEducation = ({
  profile: { loading, education },
  getEducation,
  updateEducation,
  match,
  history
}) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldOfStudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getEducation(match.params.id);
  }, [getEducation, match.params.id]);

  useEffect(() => {
    setFormData({
      school: loading || !education.school ? '' : education.school,
      degree: loading || !education.degree ? '' : education.degree,
      fieldOfStudy:
        loading || !education.fieldOfStudy ? '' : education.fieldOfStudy,
      from: loading || !education.from ? '' : education.from.slice(0, 10),
      to: loading || !education.to ? '' : education.to.slice(0, 10),
      current: loading || !education.current ? false : education.current,
      description:
        loading || !education.description ? '' : education.description
    });
  }, [education, loading]);

  const {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description
  } = formData;

  const onSubmit = e => {
    e.preventDefault();

    updateEducation(formData, history, match.params.id);
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Edit Education</h1>
          <p className="lead">
            <i className="fas fa-code-branch" /> Edit your past education at{' '}
            <span className="text-primary">
              <strong>{education.school}</strong>
            </span>
          </p>
          <small>* = required field</small>
          <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                placeholder="* School or Boot Camp"
                name="school"
                value={school}
                onChange={e => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="* Degree or Certificate"
                name="degree"
                value={degree}
                onChange={e => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Field of Study"
                name="fieldOfStudy"
                value={fieldOfStudy}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <h4>From Date</h4>
              <input
                type="date"
                name="from"
                value={from}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <p>
                <input
                  type="checkbox"
                  name="current"
                  checked={current}
                  value={current}
                  onChange={e => {
                    setFormData({ ...formData, current: !current, to: '' });
                    toggleDisabled(!toDateDisabled);
                  }}
                />{' '}
                Current Job
              </p>
            </div>
            <div className="form-group">
              <h4>To Date</h4>
              <input
                type="date"
                name="to"
                value={to}
                onChange={e => onChange(e)}
                disabled={current ? 'disabled' : ''}
              />
            </div>
            <div className="form-group">
              <textarea
                name="description"
                cols="30"
                rows="5"
                placeholder="Program Description"
                value={description}
                onChange={e => onChange(e)}
              />
            </div>
            <input type="submit" className="btn btn-primary my-1" />
            <Link className="btn btn-light my-1" to="/dashboard">
              Go Back
            </Link>
          </form>
        </Fragment>
      )}
    </Fragment>
  );
};

EditEducation.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getEducation, updateEducation }
)(withRouter(EditEducation));
