import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../layout/Loader';
import { Link } from 'react-router-dom';
import { getUserWithPlan } from '../../actions/adminActions';
import { PlanStatus } from '../../utils/enum';
import isEmpty from '../../validation/is-empty';

function UserPlan({ match }) {
  const { userWithPlan, loading } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithPlan(match.params.id));
  }, [dispatch]);

  function getStatus(id) {
    return PlanStatus[id];
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {isEmpty(userWithPlan) ? (
            <>
              <h2>No content to show</h2>
            </>
          ) : (
            <Fragment>
              <h2 className="mt-5 ml-5">
                {userWithPlan.displayName}
                {"'s Profile"}
              </h2>
              <div className="row justify-content-around mt-5 user-info">
                <div className="col-12 col-md-2 mx-auto">
                  <div className="align-center">
                    <i className="fas fa-user fa-10x"></i>
                  </div>
                </div>

                <div className="col-12 col-md-5 mx-auto">
                  <h4>Display Name</h4>
                  <p>{userWithPlan.displayName}</p>

                  <h4>Email Address</h4>
                  <p>{userWithPlan.email}</p>

                  <h4>Joined On</h4>
                  <p>{String(userWithPlan.created).substring(0, 10)}</p>
                </div>
              </div>
              <hr />
              <div className="row justify-content-between">
                <div className="col-12">
                  <div className="table-responsive">
                    <table className="table table-borderless">
                      <thead className="thead-light border-0 py-2">
                        <tr>
                          <th scope="col">
                            <div className="p-2 px-3 text-uppercase">Plans</div>
                          </th>
                          <th scope="col">
                            <div className="p-2 px-3 text-uppercase text-center">
                              Price
                            </div>
                          </th>
                          <th scope="col">
                            <div className="p-2 px-3 text-uppercase text-center">
                              Created On
                            </div>
                          </th>
                          <th scope="col">
                            <div className="p-2 px-3 text-uppercase text-center">
                              Status
                            </div>
                          </th>
                          <th scope="col">
                            <div className="p-2 px-3 text-uppercase text-center">
                              Payment Status
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {userWithPlan.plans.map((item) => (
                          <tr key={item.id}>
                            <th className="row">
                              <div className="p-2">
                                <div className="ml-3 d-inline-block align-middle">
                                  <h5 className="ms-3 mb-2">
                                    <Link className="text-dark" to="#">
                                      Plan No.{item.id}
                                    </Link>
                                  </h5>
                                </div>
                              </div>
                            </th>
                            <td className="align-middle text-center">
                              <strong>Rs. {item.subTotal}</strong>
                            </td>
                            <td className="align-middle text-center">
                              {new Date(item.createdAt).getDate() +
                                '-' +
                                parseInt(
                                  new Date(item.createdAt).getMonth() + 1
                                ) +
                                '-' +
                                new Date(item.createdAt).getFullYear()}
                            </td>
                            <td className="align-middle text-center">
                              {getStatus(item.status)}
                            </td>
                            <td className="align-middle text-center">
                              {item.isPaymentSuccess ? 'Success' : 'Pending'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </>
  );
}

export default UserPlan;
