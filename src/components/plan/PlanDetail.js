import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPlanById } from '../../actions/planActions';
import isEmpty from '../../validation/is-empty';

function PlanDetail({ match }) {
  const dispatch = useDispatch();

  const { plan } = useSelector((state) => state.plan);
  const { planDetail } = !isEmpty(plan) ? plan : {};

  useEffect(() => {
    dispatch(getPlanById(match.params.id));
  }, [dispatch]);

  return (
    <>
      {isEmpty(plan) ? (
        <h2>
          You have not created any plans, please head to catalog and create your
          watchlist
        </h2>
      ) : (
        <>
          <h2 className="mt-5">
            Your Plan Details: <b>{planDetail.length} channels</b>
          </h2>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-9">
              <div className="table-responsive">
                <table className="table table-borderless">
                  <thead className="thead-light border-0 py-2">
                    <tr>
                      <th scope="col">
                        <div className="p-2 px-3 text-uppercase">Channel</div>
                      </th>
                      <th scope="col">
                        <div className="p-2 px-3 text-uppercase text-center">
                          Price
                        </div>
                      </th>
                      <th scope="col">
                        <div className="p-2 px-3 text-uppercase text-center">
                          Genre
                        </div>
                      </th>
                      <th scope="col">
                        <div className="p-2 px-3 text-uppercase text-center">
                          Language
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {planDetail.map((item) => (
                      <tr key={item.id}>
                        <th className="row">
                          <div className="p-2">
                            <img
                              className="img-fluid"
                              src={item.pictureUrl}
                              alt={item.channelName}
                              style={{ maxHeight: '120px', maxWidth: '120px' }}
                            />
                            <div className="ml-3 d-inline-block align-middle">
                              <h5 className="ms-3 mb-2">
                                <Link
                                  className="text-dark"
                                  to={`/channel/${item.channelId}`}
                                >
                                  {item.channelName}
                                </Link>
                              </h5>
                            </div>
                          </div>
                        </th>
                        <td className="align-middle text-center">
                          <strong>Rs. {item.price}</strong>
                        </td>
                        <td className="align-middle text-center">
                          {item.genre}
                        </td>
                        <td className="align-middle text-center">
                          {item.language}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-12 col-lg-3 my-4">
              <div className="d-grid gap-2 col-6 mx-auto">
                <p>
                  <strong>Subtotal: </strong>
                  <span className="order-summary-values">
                    Rs. {plan.subTotal}
                  </span>
                </p>
                <hr />
                {plan.status === 2 && plan.isPaymentSuccess === false ? (
                  <Link
                    id="payment_btn"
                    className="btn btn-success btn-block"
                    to={`/payment/${plan.id}`}
                  >
                    Pay
                  </Link>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default PlanDetail;
