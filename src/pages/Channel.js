import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AddToCart } from '../actions/cartActions';
import { clearErrors } from '../reducers/errorReducer';
import isEmpty from '../validation/is-empty';
import { Role } from '../utils/enum';

const Channel = ({ channel }) => {
  const { cartCount, cart } = useSelector((state) => {
    console.log("In Channel useSelector cartCount, cart");
    return state.cart
  });
  const { errors } = useSelector((state) => {
    console.log("In Channel useSelector errors");
    return state.errors
  });
  const { isAuthenticated, user } = useSelector((state) => {
    console.log("In Channel useSelector isAuthenticated, user");
    return state.auth
  });

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("In channel useEffect dispatch, errors");
    if (errors) {
      toast.error(errors);
      dispatch(clearErrors());
    }
  }, [dispatch, errors]);

  const addToCart = () => {
    console.log("In channel addToCart function");
    dispatch(AddToCart(channel.id, channel.name));
  };

  const buttonToShow = (
    <button
      className="btn btn-outline-secondary me-2"
      onClick={addToCart}
      disabled={
        !isEmpty(cart)
          ? cart.cartDetails.some((ch) => ch.channelId === channel.id)
          : false
      }
    >
      <i className="fa fa-shopping-cart"></i>
    </button>
  );
console.log("In channel function");
  return (
    <>
      <div className="col-md-4">
        <div className="card h-100 shadow-sm">
          <img src={channel.pictureUrl} alt={channel.name} />
          <div className="card-body d-flex flex-column">
            <Link
              to={`/channel/${channel.id}`}
              className="text-decoration-none"
            >
              <h6 className="text-uppercase">{channel.name}</h6>
            </Link>
            <span className="mb-2">Rs.{channel.price}</span>
            <div className="btn-group mt-auto">
              {isAuthenticated && user.role !== Role.Admin ? (
                buttonToShow
              ) : (
                <></>
              )}
              <Link
                to={`/channel/${channel.id}`}
                className="btn btn-outline-secondary"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Channel;
