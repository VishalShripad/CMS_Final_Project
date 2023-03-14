import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authActions';
import { Role } from '../../utils/enum';
import isEmpty from '../../validation/is-empty';

class Navbar extends Component {
  onLogoutClick(e) {
    console.log("In logout navbar");
    e.preventDefault();
    this.props.logoutUser();
  }
  render() {
    console.log("In render navbar");
    const { isAuthenticated, user } = this.props.auth;
    const { cart } = this.props.cart;
    console.log("In render navbar"+user+" "+isAuthenticated);
    const authLinks = (
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <a className="nav-link" href="/cart">
            <i className="fa fa-shopping-cart"></i> {!isEmpty(cart) ? cart.totalCount : 0}
          </a>
        </li>
        <li className="nav-item">
          <div className="dropdown">
            <button
              className="btn text-white dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-user"></i> {user.given_name} ({user.role})
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                {user && user.role === Role.Admin && (
                  <Link to="/dashboard" className="dropdown-item">
                    Dashboard
                  </Link>
                )}
              </li>
              <li>
                <Link to="/me" className="dropdown-item">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/plans" className="dropdown-item">
                  My Plans
                </Link>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={this.onLogoutClick.bind(this)}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            CMS
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/channels">
                  Catalog
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  console.log("In mapStateToProps navbar");
  return {
    auth: state.auth,
    cart: state.cart,
  }
};

export default connect(mapStateToProps, { logoutUser })(Navbar);
