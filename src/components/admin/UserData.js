import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DeactivateUserPlan, getUsers } from '../../actions/adminActions';
import { PlanStatus } from '../../utils/enum';
import isEmpty from '../../validation/is-empty';

function UserData() {
  const dispatch = useDispatch();
  const { users, pagination } = useSelector((state) => state.admin);
  let pages = !isEmpty(pagination) ? JSON.parse(pagination) : {};
  const [pageNumber, setPageNumber] = useState(1);
  const { errors } = useSelector((state) => state.errors);

  useEffect(() => {
    console.log("In userdata useEffect dispatch, pageNumber");
    dispatch(getUsers(pageNumber));
  }, [dispatch, pageNumber]);

  useEffect(() => {
    if (!isEmpty(errors)) {
      toast.error('Error deactivation plan.');
    }
  }, [errors]);

  function setCurrentPageNumber(pageNumber) {
    setPageNumber(pageNumber);
  }

  function getStatus(id) {
    return PlanStatus[id];
  }

  function deactivatePlan(userId, planId) {
    dispatch(DeactivateUserPlan(userId, planId));
  }

  function setTextStyle(id) {
    let st = PlanStatus[id];
    if (st === 'Active') return 'fw-bold text-success';
    if (st === 'No Plans') return 'fw-bold text-warning';
    if (st === 'Expired') return 'fw-bold text-danger';
    if (st === 'Not Active') return 'fw-bold text-info';
  }

  return (
    <>
      {isEmpty(users) ? (
        <h2>No users to show</h2>
      ) : (
        <>
          <div className="container">
            <div className="row d-flex justify-content-between">
            <h2 className='text-center'>User Information Dashboard</h2>
              <div className="table-responsive">
                <table className="table">
                  <thead className="thead-light border-0 py-2">
                    <tr>
                      <th scope="col">
                        <div className="p-2 px-3 text-uppercase text-center">
                          Name
                        </div>
                      </th>
                      <th scope="col">
                        <div className="p-2 px-3 text-uppercase text-center">
                          Email
                        </div>
                      </th>
                      <th scope="col">
                        <div className="p-2 px-3 text-uppercase">Address</div>
                      </th>
                      <th scope="col">
                        <div className="p-2 px-3 text-uppercase text-center">
                          CreatedAt
                        </div>
                      </th>
                      <th scope="col">
                        <div className="p-2 px-3 text-uppercase text-center">
                          Plan Status
                        </div>
                      </th>
                      <th scope="col">
                        <div className="p-2 px-3 text-uppercase text-center">
                          Days to End
                        </div>
                      </th>
                      <th scope="col">
                        <div className="p-2 px-3 text-uppercase text-center">
                          Deactivate
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((item) => (
                      <tr key={item.id}>
                        <th className="align-middle text-center">
                          <Link to={`/admin/user/${item.id}`} className="text-dark">
                          {item.displayName}
                          </Link>
                        </th>
                        <td className="align-middle text-center">
                          {item.email}
                        </td>
                        <td className="align-middle">
                          {isEmpty(item.address) ? (
                            <span>Not present</span>
                          ) : (
                            <>
                              <span>
                                <strong>Name: </strong>
                                {item.address.firstName} {item.address.lastName}
                              </span>
                              {', '}
                              <br />
                              <span>
                                <strong>Street: </strong>
                                {item.address.street}
                                {', '} <strong>City: </strong>
                                {item.address.city}
                                {', '}
                              </span>
                              <br />
                              <span>
                                <strong>State: </strong> {item.address.state}
                                {', '}
                                <strong>ZipCode: </strong>{' '}
                                {item.address.zipCode}
                                {', '}
                              </span>
                              <br />
                              <span>
                                <strong>Ph.: </strong>
                                {item.address.phoneNumber}
                              </span>
                            </>
                          )}
                        </td>
                        <td className="align-middle text-center">
                          {new Date(item.created).getDate() +
                            '-' +
                            parseInt(new Date(item.created).getMonth() + 1) +
                            '-' +
                            new Date(item.created).getFullYear()}
                        </td>
                        <td
                          className={classNames('align-middle text-center', {
                            [`${setTextStyle(item.planStatus)}`]: true,
                          })}
                        >
                          {getStatus(item.planStatus)}
                        </td>
                        <td className="align-middle text-center">
                          {item.remainingDays === 99
                            ? 'NA'
                            : item.remainingDays}
                        </td>
                        <td className="align-middle text-center">
                          {item.isPlanToDeactivate ? (
                            <button
                              className="btn btn-danger btn-block"
                              onClick={() =>
                                deactivatePlan(item.id, item.planId)
                              }
                            >
                              Remove
                            </button>
                          ) : (
                            'NA'
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="d-flex justify-content-between align-items-center my-3">
                  {!isEmpty(pages) ? (
                    <Pagination
                      activePage={pages.currentPage}
                      itemsCountPerPage={pages.itemsPerPage}
                      totalItemsCount={pages.totalItems}
                      onChange={setCurrentPageNumber}
                      nextPageText={'Next'}
                      prevPageText={'Prev'}
                      firstPageText={'First'}
                      lastPageText={'Last'}
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UserData;
