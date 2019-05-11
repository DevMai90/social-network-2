import React, { Fragment, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, getExperience } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const EditExperience = ({
  profile: { profile, loading, experience },
  getCurrentProfile,
  getExperience,
  match
}) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
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
    getExperience(match.params.id);
  }, [getExperience, match.params.id]);

  useEffect(() => {
    setFormData({
      company: loading || !experience.company ? '' : experience.company,
      title: loading || !experience.title ? '' : experience.title,
      location: loading || !experience.location ? '' : experience.location,
      from: loading || !experience.from ? '' : experience.from.slice(0, 10),
      to: loading || !experience.to ? '' : experience.to.slice(0, 10),
      current: loading || !experience.current ? '' : experience.current,
      description:
        loading || !experience.description ? '' : experience.description
    });
  }, [experience, loading]);

  const { company, title, location, from, to, current, description } = formData;

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Add An Experience</h1>
          <p className="lead">
            <i className="fas fa-code-branch" /> Add any developer/programming
            positions that you have had in the past
          </p>
          <small>* = required field</small>
          <form className="form">
            <div className="form-group">
              <input
                type="text"
                placeholder="* Job Title"
                name="title"
                value={title}
                onChange={e => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="* Company"
                name="company"
                value={company}
                onChange={e => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Location"
                name="location"
                value={location}
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
                    setFormData({ ...formData, current: !current });
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
                disabled={toDateDisabled ? 'disabled' : ''}
              />
            </div>
            <div className="form-group">
              <textarea
                name="description"
                cols="30"
                rows="5"
                placeholder="Job Description"
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

EditExperience.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getExperience }
)(withRouter(EditExperience));
