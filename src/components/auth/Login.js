import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loginUser } from '../../actions/authActions';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    
    super();
    this.state = {
      Email: '',
      Password: '',
      errors: {},
    };
    console.log("In login constructor");
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    console.log("In login componentDidMount");
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("In componentWillReceiveProps login");
    if (nextProps.auth.isAuthenticated) {
      console.log("In componentWillReceiveProps login is authenticated");
      this.props.history.push('/dashboard');
    }
    if (nextProps.errors.errors !== undefined) {
      console.log("In componentWillReceiveProps login error");
      this.setState({ errors: nextProps.errors.errors });
    } else if (
      nextProps.errors !== undefined &&
      nextProps.auth.isAuthenticated !== true
    ) {
      this.setState({ errors: nextProps.errors });
      toast.error(nextProps.errors.message);
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      Email: this.state.Email,
      Password: this.state.Password,
    };
    console.log("In login before submit");
    this.props.loginUser(userData);
    console.log("In login after submit");
  }

  render() {
    const { errors } = this.state;
    console.log("In login render");
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your CMS account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className={classNames('form-control', {
                      'is-invalid': errors.Email,
                    })}
                    name="Email"
                    placeholder="Email address"
                    value={this.state.Email}
                    onChange={this.onChange}
                  />
                  {errors.Email && (
                    <div className="invalid-feedback">{errors.Email}</div>
                  )}
                  <label for="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className={classNames('form-control', {
                      'is-invalid': errors.Password,
                    })}
                    name="Password"
                    placeholder="Password"
                    value={this.state.Password}
                    onChange={this.onChange}
                  />
                  {errors.Password && (
                    <div className="invalid-feedback">{errors.Password}</div>
                  )}
                  <label for="floatingInput">Password</label>
                </div>
                <div className='text-end'>
                  <Link to="/forget-password">Forget Password!</Link>
                </div>
                <div className="d-grid">
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  console.log("In mapStateToProps login");
  return {
    auth: state.auth,
    errors: state.errors,
  }
};

export default connect(mapStateToProps, { loginUser })(Login);