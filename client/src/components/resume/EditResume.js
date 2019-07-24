import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteResume } from '../../actions/profile';

const EditResume = ({
  getCurrentProfile,
  deleteResume,
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading || profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Upload Your Resume</h1>
      <p className="lead">
        <i className="fas fa-file-alt" /> Let the DevConnector community review
        your resume <i>(optional)</i>
      </p>
      {profile.resume ? (
        <Fragment>
          <a
            href={profile.resume}
            target="_blank"
            className="btn btn-light"
            rel="noopener noreferrer"
          >
            View Current Resume
          </a>
          <button
            type="button"
            className="btn btn-danger"
            onClick={e => deleteResume()}
          >
            <i className="fas fa-times" />
          </button>
        </Fragment>
      ) : (
        <p>No resume uploaded!</p>
      )}
    </Fragment>
  );
};

EditResume.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteResume: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteResume }
)(EditResume);
