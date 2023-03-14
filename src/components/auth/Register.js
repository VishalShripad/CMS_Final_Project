import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux'; // connecting redux to this component
import { registerUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';


class Register extends Component {
    // one is Application state managed by redux here and another is component state
    constructor() {
      super();
      this.state = {
        DisplayName: '',
        Email: '',
        Password: '',
        //ConfirmPassword: '',
        errors: {},
      };
      console.log("In constructor register");
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }
  
  componentDidMount() {
    console.log("In componentDidMount register");
      if (this.props.auth.isAuthenticated) {
        this.props.history.push('/dashboard');
      }
    }
  
  componentWillReceiveProps(nextProps) {
    console.log("In componentWillReceiveProps register");
      if (nextProps.errors.errors !== undefined) {
        this.setState({ errors: nextProps.errors.errors });
      } else if (
        nextProps.errors !== undefined &&
        nextProps.auth.isAuthenticated !== true
      ) {
        this.setState({ errors: nextProps.errors });
        toast.error(nextProps.errors.message);
      }
    }
  
    // In forms in react we cannot edit the form because of the state variable becase its default component state.
    // to edit form we have to call onChange function on every field of form.
    onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }
  
    onSubmit(e) {
      e.preventDefault();
  
      const newUser = {
        DisplayName: this.state.DisplayName,
        Email: this.state.Email,
        Password: this.state.Password,
        //ConfirmPassword: this.state.ConfirmPassword,
      };
      console.log("In before Onsubmit");
      // the second parameter history will allow us to redirect to another page withnin this registeruser action
      // in export statement surround register component with withRouter.
      this.props.registerUser(newUser, this.props.history);
      console.log("In after Onsubmit");
    }
    render() {
      // destructuring
      console.log("In register render");
      const { errors } = this.state;
  
      return (
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">Create your CMS account</p>
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className={classNames('form-control', {
                        'is-invalid': errors.DisplayName,
                      })}
                      name="DisplayName"
                      placeholder="Display Name"
                      value={this.state.DisplayName}
                      onChange={this.onChange}
                    />
                    {errors.DisplayName && (
                      <div className="invalid-feedback">{errors.DisplayName}</div>
                    )}
                    <label for="floatingInput">Display Name</label>
                  </div>
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
                  {/* <div className="form-floating mb-3">
                    <input
                      type="password"
                      className={classNames('form-control', {
                        'is-invalid': errors.ConfirmPassword,
                      })}
                      name="ConfirmPassword"
                      placeholder="Confirm Password"
                      value={this.state.ConfirmPassword}
                      onChange={this.onChange}
                    />
                    {errors.ConfirmPassword && (
                      <div className="invalid-feedback">
                        {errors.ConfirmPassword}
                      </div>
                    )}
                    <label for="floatingInput">Confirm Password</label>
                  </div> */}
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
  
Register.propTypes = {
    
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  };
  // to get any of the state from redux in component
function mapStateToProps(state) { 
  console.log("In mapStateToProps register");
  return{
    auth: state.auth, // this comes from root reducer
      errors: state.errors
  }
  };
  export default connect(mapStateToProps, { registerUser })(withRouter(Register));
  