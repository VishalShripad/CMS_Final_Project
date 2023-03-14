import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
  componentDidMount() {
    console.log("In landing componentDidMount");
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    console.log("In landing render");
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">CMS</h1>
                <p className="lead">Faster than the speed of light.</p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info me-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
console.log("In end Landing");
Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  console.log("In mapStateToProps Landing");
  return {
    auth: state.auth,
  }
};

export default connect(mapStateToProps)(Landing);

