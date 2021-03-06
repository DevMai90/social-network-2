import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{' '}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="/profiles">
          <i className="fab fa-connectdevelop" />{' '}
          <span className="hide-sm">Developers</span>
        </Link>
      </li>
      <li>
        <Link to="/jobs">
          <i className="far fa-list-alt" />{' '}
          <span className="hide-sm">Job Board</span>
        </Link>
      </li>
      <li>
        <Link to="/posts">
          <i className="far fa-address-book" />{' '}
          <span className="hide-sm">Posts</span>
        </Link>
      </li>
      <li>
        <Link onClick={logout} to="/">
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          <i className="fab fa-connectdevelop" />{' '}
          <span className="hide-sm">Developers</span>
        </Link>
      </li>
      <li>
        <Link to="/register/jobs">
          <i className="far fa-list-alt" />{' '}
          <span className="hide-sm">Job Board</span>
        </Link>
      </li>
      <li>
        <Link to="/register">
          <i className="fas fa-user-plus" />{' '}
          <span className="hide-sm">Register</span>
        </Link>
      </li>
      <li>
        <Link to="/login">
          <i className="fas fa-sign-in-alt" />{' '}
          <span className="hide-sm">Login</span>
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code" /> DevConnector
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
