import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllPlansForUser } from '../../actions/planActions';
import { PlanStatus } from '../../utils/enum';
import isEmpty from '../../validation/is-empty';

function Plans() {
  const dispatch = useDispatch();
  const { plans } = useSelector((state) => state.plan);

  useEffect(() => {
    dispatch(getAllPlansForUser());
  }, [dispatch]);

  function getStatus(id) {
    return PlanStatus[id];
  }

  return (
    <>
      {isEmpty(plans) ? (
        <h2>
          You have not created any plans, please head to catalog and create your
          watchlist
        </h2>
      ) : (
        <>
          <h2 className="mt-5">
            Your Plans: <b>{plans.length} Plan/s</b>
          </h2>
          <div className="row d-flex justify-content-between">
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
                    {plans.map((item) => (
                      <tr key={item.id}>
                        <th className="row">
                          <div className="p-2">
                            <img
                              className="img-fluid"
                              src={item.planDetail[0].pictureUrl}
                              alt={item.id}
                              style={{ maxHeight: '120px', maxWidth: '120px' }}
                            />
                            <div className="ml-3 d-inline-block align-middle">
                              <h5 className="ms-3 mb-2">
                                <Link
                                  className="text-dark"
                                  to={`/plan/${item.id}`}
                                >
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
                            parseInt(new Date(item.createdAt).getMonth() + 1) +
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
        </>
      )}
    </>
  );
}

export default Plans;
