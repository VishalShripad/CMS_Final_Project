import React from 'react';

function ForgotPassword() {
  return (
    <>
      <div className="container">
        <div className="col-md-8 m-auto">
          <h4>Please enter email id registerd with us.</h4>
          <form onSubmit={submitHandler}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className={classNames('form-control', {
                  'is-invalid': error.Email,
                })}
                name="Email"
                placeholder="Email"
                value={email}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              {error.Email && (
                <div className="invalid-feedback">{error.Email}</div>
              )}
              <label for="floatingInput">Email</label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
