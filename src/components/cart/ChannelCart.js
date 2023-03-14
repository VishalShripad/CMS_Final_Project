import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GetCartItems, RemoveFromCart } from '../../actions/cartActions';
import { checkout } from '../../actions/planActions';
import isEmpty from '../../validation/is-empty';

function ChannelCart() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { updateCart, cart } = useSelector((state) => {
    console.log("In ChannelCart useSelector updateCart, cart");
    return state.cart
  });
  const { plan } = useSelector((state) => {
    console.log("In ChannelCart useSelector plan");
    return state.plan
  });
  const { data } = useSelector((state) => {
    console.log("In ChannelCart useSelector data");
    return state.errors
  });

  const { cartDetails } = !isEmpty(cart) ? cart : {};

  let [checkoutComplete, setCheckoutComplete] = useState(false);

  function removeCartItemHandler(id) {
    console.log("In ChannelCart removeCartItemHandler function");
    dispatch(RemoveFromCart(id));
  }

  function checkoutHandler() {
    console.log("In ChannelCart checkoutHandler function");
    dispatch(checkout());
    setCheckoutComplete(true);
  }

  useEffect(() => {
    console.log("In ChannelCart useEffect checkoutComplete, plan");
    if (!isEmpty(plan) && checkoutComplete === true) {
      dispatch(GetCartItems());
      history.push(`/payment/${plan.id}`);
    }
  }, [checkoutComplete, plan]);

  useEffect(() => {
    console.log("In ChannelCart useEffect dispatch, updateCart");
    if (updateCart === true) {
      dispatch(GetCartItems());
    }
  }, [dispatch, updateCart]);

  useEffect(() => {
    console.log("In ChannelCart useEffect data");
    if (!isEmpty(data)) {
      toast.info(data.message);
    }
  }, [data]);

  console.log("In ChannelCart function");
  return (
    <>
      {isEmpty(cartDetails) ? (
        <h2 className="mt-5">Your Watchlist is Empty</h2>
      ) : (
        <>
          <h2 className="mt-5">
            Your Watchlist: <b>{cartDetails.length} channels</b>
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
                      <th scope="col" className="border-0">
                        <div className="p-2 px-3 text-uppercase text-center">
                          Remove
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartDetails.map((item) => (
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
                        <td className="align-middle text-center">
                          <button
                            className="btn btn-danger btn-block"
                            onClick={() =>
                              removeCartItemHandler(item.channelId)
                            }
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal:{' '}
                  <span className="order-summary-values">
                    Rs. {cart.subTotal}
                  </span>
                </p>

                <hr />
                <button
                  id="checkout_btn"
                  className="btn btn-primary btn-block"
                  onClick={checkoutHandler}
                >
                  Check out
                </button>
                <hr />
                <span className="text-danger">
                  Once you click checkout, you cannot make changes to your plan
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default ChannelCart;
