import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AddToCart, GetCartItems } from '../../actions/cartActions';
import { GetChannelById } from '../../actions/channelActions';
import { clearErrors } from '../../reducers/errorReducer';
import { Role } from '../../utils/enum';
import isEmpty from '../../validation/is-empty';
import Loader from '../layout/Loader';

const ChannelDetails = ({ match }) => {
  const dispatch = useDispatch();

  const { loading, channel } = useSelector((state) => { console.log("In ChannelDetails useSelector loading, channel"); return state.channel });
  const { errors } = useSelector((state) => { console.log("In ChannelDetails useSelector errors"); return state.errors });
  const { updateCart, cart } = useSelector((state) => { console.log("In ChannelDetails useSelector updateCart, cart"); return state.cart });
  const { isAuthenticated, user } = useSelector((state) => { console.log("In ChannelDetails useSelector isAuthenticated, user "); return state.auth });

  useEffect(() => {
    console.log("In ChannelDetails useEffect dispatch, errors, match.params.id");
    dispatch(GetChannelById(match.params.id));

    if (errors) {
      toast.error(errors);
      dispatch(clearErrors());
    }
  }, [dispatch, errors, match.params.id]);

  const addToCart = () => {
    console.log("In ChannelDetails function addToCart");
    dispatch(AddToCart(match.params.id, channel.name));
  };

  useEffect(() => {
    console.log("In ChannelDetails useEffect updateCart");
    if (updateCart === true) {
      dispatch(GetCartItems());
    }
  }, [updateCart]);

  const checkDisable = () => {
    console.log("In ChannelDetails function checkDisable");
    if (!isEmpty(cart)) {
      return cart.cartDetails.some((ch) => ch.channelId == match.params.id);
    }
  };
  console.log("In ChannelDetails function");
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mt-5">
          <div className="row">
            <div className="col-6">
              <img
                src={channel.pictureUrl}
                alt={channel.name}
                className="img-fluid h-75"
              />
            </div>
            <div className="col-6">
              <h3>{channel.name}</h3>
              <p style={{ fontSize: '2em' }}>Rs.{channel.price}</p>
              <div className="row row-col-2">
                <div className="d-flex justify-content-evenly">
                  <span>
                    <strong>Genre: </strong> {channel.channelGenre}
                  </span>
                  <span>
                    <strong>Language: </strong> {channel.channelLanguage}
                  </span>
                </div>
              </div>
              <div className="d-flex justify-content-start align-items-center">
                {isAuthenticated && user.role !== Role.Admin ? (
                  <button
                    className="btn btn-info btn-block"
                    onClick={addToCart}
                    disabled={checkDisable()}
                  >
                    Add to watch
                  </button>
                ) : (
                  <></>
                )}
              </div>
              <div className="row mt-2">
                <div className="col-12 ml-3">
                  <h4>Description</h4>
                  <p>{channel.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChannelDetails;
