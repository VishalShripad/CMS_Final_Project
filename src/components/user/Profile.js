import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import { Link } from 'react-router-dom';
import { getUser, setUserLoading } from '../../actions/userActions';

function Profile() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { loading, userInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserLoading());
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={'Your Profile'} />
          <h2 className="mt-5 ml-5">My Profile</h2>
          <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-2 mx-auto">
              <div className="align-center">
                <i className="fas fa-user fa-10x"></i>
              </div>

              <Link
                to="/me/update"
                id="edit_profile"
                className="btn btn-primary btn-block d-grid my-5"
              >
                Edit Profile
              </Link>
            </div>

            <div className="col-12 col-md-5 mx-auto">
              <h4>Display Name</h4>
              <p>{userInfo.displayName}</p>

              <h4>Email Address</h4>
              <p>{userInfo.email}</p>

              <h4>Joined On</h4>
              <p>{String(userInfo.created).substring(0, 10)}</p>

              <div className="d-grid gap-2 d-md-block">
                {user.role !== 'admin' && (
                  <Link to="/plans" className="btn btn-danger me-2">
                    My Plans
                  </Link>
                )}

                <Link to="/changePassword" className="btn btn-primary">
                  Change Password
                </Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
}

export default Profile;
