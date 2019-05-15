import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { removeComment } from '../../actions/post';

// Todo: Edit comment item if authenticated
const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  removeComment
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img className="round-img" src={avatar} alt="" />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">
        Posted on <Moment format="MM/DD/YY">{date}</Moment>
      </p>
      {!auth.loading && auth.user._id === user && (
        <Fragment>
          <button
            type="button"
            className="btn btn-dark"
            // Todo: Edit comment if authenticated
          >
            Edit Comment
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={e => removeComment(postId, _id)}
          >
            <i className="fas fa-times" />
          </button>
        </Fragment>
      )}
    </div>
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  removeComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { removeComment }
)(CommentItem);
