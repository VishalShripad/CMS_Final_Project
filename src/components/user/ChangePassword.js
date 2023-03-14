import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { passwordChange } from '../../actions/authActions';
import { clearErrors } from '../../reducers/errorReducer';
import isEmpty from '../../validation/is-empty';

function ChangePassword() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, changePassword, loading } = useSelector(
    (state) => state.auth
  );
  const { errors } = useSelector((state) => state.errors);
  const [oldPassword, setOldPassword] = useState('');
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
    if (!isEmpty(changePassword)) {
      toast.success(changePassword);
      setOldPassword('');
      setPassword('');
      setConfirmPassword('');
    }
  }, [changePassword]);

  const submitHandler = (e) => {
    e.preventDefault();
    let data = {
      email: user.email,
      oldPassword: oldPassword,
      password: password,
      confirmPassword: confirmPassword,
    };
    dispatch(passwordChange(data));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h4>
            <strong>Email: </strong>
            {user.email}
          </h4>
          <form onSubmit={submitHandler}>
            <div className="form-floating mb-3">
              <input
                type="password"
                className={classNames('form-control', {
                  'is-invalid': error.OldPassword,
                })}
                name="OldPassword"
                placeholder="OldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              {error.OldPassword && (
                <div className="invalid-feedback">{error.OldPassword}</div>
              )}
              <label for="floatingInput">OldPassword</label>
            </div>
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
                <div className="invalid-feedback">{error.ConfirmPassword}</div>
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
  );
}

export default ChangePassword;
