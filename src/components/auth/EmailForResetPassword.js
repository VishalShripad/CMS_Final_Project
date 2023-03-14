import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { SendPasswordResetLink } from '../../actions/authActions';
import Loader from '../layout/Loader';

function EmailForResetPassword({ match }) {
  const dispatch = useDispatch();
  const { loading, resetLinkSend } = useSelector((state) => state.auth);
  const [EmailForPasswordReset, setEmailForPasswordReset] = useState('');
  const { status, message } = useSelector((state) => state.errors);

  useEffect(() => {
    if (resetLinkSend !== '') {
      toast.success(resetLinkSend);
      setEmailForPasswordReset('');
    }
    if (status === 'Error') {
      toast.error(message);
    }
  }, [resetLinkSend, status]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(SendPasswordResetLink(EmailForPasswordReset));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <div>
                <h4 className="text-info">
                  Please enter email id registerd with us.
                </h4>
                <form onSubmit={submitHandler}>
                  <div className="form-floating mb-3">
                    <input
                      required
                      type="email"
                      className="form-control"
                      name="EmailForPasswordReset"
                      placeholder="Email"
                      value={EmailForPasswordReset}
                      onChange={(e) => setEmailForPasswordReset(e.target.value)}
                    />
                    <label for="floatingInput">Email</label>
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
      )}
    </>
  );
}

export default EmailForResetPassword;
