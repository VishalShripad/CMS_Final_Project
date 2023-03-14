import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPlanById, makePayment } from '../../actions/planActions';
import isEmpty from '../../validation/is-empty';

function Payment({ match }) {
  const dispatch = useDispatch();

  const { plan, isPaymentSuccess } = useSelector((state) => state.plan);
  const { planDetail } = !isEmpty(plan) ? plan : {};

  let [enablePaymentButton, setEnablePaymentButton] = useState(false);
  let [paymentOption, setPaymentOption] = useState('');
  let [upiId, setUpiId] = useState('');
  let [paymentStatus, setPaymentStatus] = useState();
  let [paymentStatusString, setPaymentStatusString] = useState('Pending');

  useEffect(() => {
    if (paymentOption === 'upi' && upiId !== '') {
      setEnablePaymentButton(true);
    } else if (paymentOption === 'wallet') {
      setEnablePaymentButton(true);
    } else {
      setEnablePaymentButton(false);
    }
  }, [paymentOption, upiId]);

  useEffect(() => {
    dispatch(getPlanById(match.params.id));
  }, [dispatch]);

  function paymentHandler() {
    let payment = {
      ModeOfPayment: paymentOption,
      planId: plan.id,
    };
    dispatch(makePayment(payment));
  }

  useEffect(() => {
    if (plan.isPaymentSuccess === true || isPaymentSuccess === true) {
      setPaymentStatus(true);
      setPaymentStatusString('Success');
    } else if (isPaymentSuccess === false) {
      setPaymentStatus(false);
      setPaymentStatusString('Failed');
    } else if (plan.isPaymentSuccess === false && isPaymentSuccess === '') {
      setPaymentStatus('');
      setPaymentStatusString('Pending');
    }
  }, [isPaymentSuccess, plan]);

  return (
    <>
      {isEmpty(planDetail) ? (
        <h2 className="mt-5">Your Watchlist is Empty</h2>
      ) : (
        <>
          <h2 className="mt-5">
            Your Watchlist: <b>{planDetail.length} channels</b>
          </h2>

          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
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
                    </tr>
                  </thead>
                  <tbody>
                    {planDetail.map((item) => (
                      <tr key={item.channel}>
                        <th className="row">
                          <div className="p-2">
                            <img
                              className="img-fluid"
                              src={item.pictureUrl}
                              alt={item.name}
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="payment">
                {paymentStatus === true ? (
                  <>
                    <h3 style={{ fontWeight: '800', color: 'grey' }}>
                      Payment Status:{' '}
                    </h3>
                    <h2 className="text-success">{paymentStatusString}</h2>
                  </>
                ) : (
                  <>
                    <h3 style={{ fontWeight: '800', color: 'grey' }}>
                      Payment Status:{' '}
                    </h3>
                    <h2 className="text-info">{paymentStatusString}</h2>
                    <h4>Payment portal</h4>
                    <hr />
                    <p>
                      Subtotal:{' '}
                      <span className="order-summary-values">
                        Rs. {plan.subTotal}
                      </span>
                    </p>
                    <hr />
                    <div>
                      <select
                        className="form-select mb-4"
                        onChange={(e) => setPaymentOption(e.target.value)}
                        value={paymentOption}
                        style={{ cursor: 'pointer' }}
                      >
                        <option value={''}>Select Payment Mode</option>
                        <option value={'upi'}>UPI</option>
                        <option disabled value={'wallet'}>
                          wallet (comming soon)
                        </option>
                      </select>
                      {paymentOption === 'upi' ? (
                        <input
                          className="form-control me-2"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="Enter UPI ID"
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                    <hr />
                    <button
                      id="payment_btn"
                      className="btn btn-success btn-block"
                      disabled={!enablePaymentButton}
                      onClick={paymentHandler}
                    >
                      Make Payment
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Payment;
