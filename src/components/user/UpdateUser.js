import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  getUserAddress,
  setUserLoading,
  updateUserAddress,
} from '../../actions/userActions';
import classNames from 'classnames';
import Loader from '../layout/Loader';
import { clearErrors } from '../../reducers/errorReducer';

function UpdateUser({ history }) {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Street, setStreet] = useState('');
  const [City, setCity] = useState('');
  const [State, setState] = useState('');
  const [ZipCode, setZipCode] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const { address, loading } = useSelector((state) => state.user);
  const { errors } = useSelector((state) => state.errors);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAddress());
  }, []);

  useEffect(() => {
    if (address) {
      setFirstName(address.firstName === null ? '' : address.firstName);
      setLastName(address.lastName === null ? '' : address.lastName);
      setStreet(address.street === null ? '' : address.street);
      setCity(address.city === null ? '' : address.city);
      setState(address.state === null ? '' : address.state);
      setZipCode(address.zipCode === null ? '' : address.zipCode);
      setPhoneNumber(address.phoneNumber === null ? '' : address.phoneNumber);
    }
  }, [address]);

  useEffect(() => {
    if (errors) {
      //toast.error(errors.message);
      setError(errors);
      dispatch(clearErrors());
    }
  }, [errors, dispatch, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    let userAddress = {
      FirstName: FirstName,
      LastName: LastName,
      City: City,
      Street: Street,
      State: State,
      ZipCode: ZipCode,
      PhoneNumber: PhoneNumber,
    };
    dispatch(setUserLoading());
    dispatch(updateUserAddress(userAddress));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h2>User Profile</h2>
              <form onSubmit={submitHandler}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className={classNames('form-control', {
                      'is-invalid': error.FirstName,
                    })}
                    name="FirstName"
                    placeholder="First Name"
                    value={FirstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {error.FirstName && (
                    <div className="invalid-feedback">{error.FirstName}</div>
                  )}
                  <label for="floatingInput">First Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="LastName"
                    className={classNames('form-control', {
                      'is-invalid': error.LastName,
                    })}
                    name="LastName"
                    placeholder="Last Name"
                    value={LastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {error.LastName && (
                    <div className="invalid-feedback">{error.LastName}</div>
                  )}
                  <label for="floatingInput">Last Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="Street"
                    className={classNames('form-control', {
                      'is-invalid': error.Street,
                    })}
                    name="Street"
                    placeholder="Street"
                    value={Street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                  {error.Street && (
                    <div className="invalid-feedback">{error.Street}</div>
                  )}
                  <label for="floatingInput">Street</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="City"
                    className={classNames('form-control', {
                      'is-invalid': error.City,
                    })}
                    name="City"
                    placeholder="City"
                    value={City}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  {error.City && (
                    <div className="invalid-feedback">{error.City}</div>
                  )}
                  <label for="floatingInput">City</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="State"
                    className={classNames('form-control', {
                      'is-invalid': error.State,
                    })}
                    name="State"
                    placeholder="State"
                    value={State}
                    onChange={(e) => setState(e.target.value)}
                  />
                  {error.State && (
                    <div className="invalid-feedback">{error.State}</div>
                  )}
                  <label for="floatingInput">State</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="ZipCode"
                    className={classNames('form-control', {
                      'is-invalid': error.ZipCode,
                    })}
                    name="ZipCode"
                    placeholder="ZipCode"
                    value={ZipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                  {error.ZipCode && (
                    <div className="invalid-feedback">{error.ZipCode}</div>
                  )}
                  <label for="floatingInput">ZipCode</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="ZipCode"
                    className={classNames('form-control', {
                      'is-invalid': error.PhoneNumber,
                    })}
                    name="PhoneNumber"
                    placeholder="Phone Number"
                    value={PhoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  {error.PhoneNumber && (
                    <div className="invalid-feedback">{error.PhoneNumber}</div>
                  )}
                  <label for="floatingInput">Phone Number</label>
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
      )}
    </>
  );
}

export default UpdateUser;
