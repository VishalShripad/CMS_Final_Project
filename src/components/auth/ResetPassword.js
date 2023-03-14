import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPassword } from '../../actions/authActions';
import { clearErrors } from '../../reducers/errorReducer';

function ResetPassword({ match }) {
  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state.errors);
  const { resetPasswordSuccess } = useSelector((state) => state.auth);

  const { search } = useLocation();

  const token = new URLSearchParams(search).get('token');
  const email = new URLSearchParams(search).get('email');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (errors) {
      setError(errors);

      dispatch(clearErrors());
    }
  }, [errors]);

  useEffect(() => {
    if (resetPasswordSuccess !== '') {
      toast.success(resetPasswordSuccess);
    }
  }, [resetPasswordSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    let data = {
      email: email,
      token: token,
      password: password,
      confirmPassword: confirmPassword,
    };

    dispatch(resetPassword(data));
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h4> Reset Password </h4>
            <form onSubmit={submitHandler}>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className={classNames('form-control', {
                    'is-invalid': error.Password,
                  })}
                  name="Password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error.Password && (
                  <div className="invalid-feedback">{error.Password}</div>
                )}
                <label for="floatingInput">Password</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className={classNames('form-control', {
                    'is-invalid': error.ConfirmPassword,
                  })}
                  name="ConfirmPassword"
                  placeholder="ConfirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error.ConfirmPassword && (
                  <div className="invalid-feedback">
                    {error.ConfirmPassword}
                  </div>
                )}
                <label for="floatingInput">ConfirmPassword</label>
              </div>
              <div className="d-grid">
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
