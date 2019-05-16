import React, { useState, useEffect, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import Spinner from '../layout/Spinner';

const EditPost = ({ getPost, match, post: { post, loading } }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  useEffect(() => {
    !loading && post && setText(post.text);
  }, [loading, post]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link className="btn btn-light my-1" to="/posts">
            Back To Posts
          </Link>
          <div className="post-form">
            <div className="bg-primary p">
              <h3>Edit Post...</h3>
            </div>
            <form
              className="form my-1"
              onSubmit={e => {
                e.preventDefault();
                // addPost({ text });
                // setText('');
              }}
            >
              <textarea
                name="text"
                cols="30"
                rows="5"
                placeholder="Create a post"
                required
                value={text}
                onChange={e => setText(e.target.value)}
              />
              <input
                type="submit"
                className="btn btn-dark my-1"
                value="Update Post"
              />
            </form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

EditPost.propTypes = {};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(EditPost);
