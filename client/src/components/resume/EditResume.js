import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCurrentProfile,
  deleteResume,
  uploadResume
} from '../../actions/profile';

const EditResume = ({
  getCurrentProfile,
  deleteResume,
  uploadResume,
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  // Component State
  const [resume, setResume] = useState(undefined);
  const [description, setDescription] = useState("Someone's resume");

  const onChange = e => {
    setResume(e.target.files[0]);
  };
  const onSubmit = e => {
    e.preventDefault();

    // Format the form data before sending it to axios
    // This allows it to be sent as multipart/form-data
    let formData = new FormData();
    formData.append('description', description);
    formData.append('resume', resume);

    // Call redux action
    uploadResume(formData);
  };

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
        <Fragment>
          <p>No resume uploaded!</p>
          <form className="form" action="submit">
            <div className="form-group">
              <input
                type="file"
                className="form-control-file"
                name="resume"
                onChange={e => onChange(e)}
              />
              <small className="text-muted">*PDF format only</small>
            </div>
            <button
              className="btn btn-primary"
              type="button"
              onClick={e => onSubmit(e)}
            >
              Upload Resume
            </button>
          </form>
        </Fragment>
      )}
    </Fragment>
  );
};

EditResume.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteResume: PropTypes.func.isRequired,
  uploadResume: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteResume, uploadResume }
)(EditResume);
