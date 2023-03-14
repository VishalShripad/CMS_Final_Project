import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GetVendors } from '../../actions/adminActions';
import isEmpty from '../../validation/is-empty';

function Vendors() {
  const dispatch = useDispatch();
  const { vendors } = useSelector((state) => state.admin);

  const [selected, setSelected] = useState(null);

  const toggle = (index) => {
    if (selected === index) {
      return setSelected(null);
    }

    setSelected(index);
  };

  useEffect(() => {
    dispatch(GetVendors());
  }, [dispatch]);

  return (
    <>
      <div className="container justify-content-center align-center">
        <div className="row">
          {isEmpty(vendors) ? (
            <>
              <h2>Cannot load vendors page.</h2>
            </>
          ) : (
            <>
              <div className="accordion">
                {vendors.map((item, index) => (
                  <>
                    <div className="accItem" onClick={() => toggle(index)}>
                      <div className="accTitle">
                        <h2 className="col">{item.name}</h2>
                        <h6 className="col">{item.description}</h6>
                        <span className="col">
                          <strong>Total Price: </strong>
                          {item.totalPrice}
                        </span>
                        <span className="col">
                          <strong>Users: </strong>
                          {item.totalUserCount}
                        </span>
                        <span>{selected === index ? '-' : '+'}</span>
                      </div>
                      <div
                        className={
                          selected === index ? 'accContent show' : 'accContent'
                        }
                      >
                        <div className="row mb-3">
                          <div className="col text-center"></div>
                          <div className="col text-center">
                            <strong>Name</strong>
                          </div>
                          <div className="col text-center">
                            <strong>Description</strong>
                          </div>
                          <div className="col text-center">
                            <strong>Genre</strong>
                          </div>
                          <div className="col text-center">
                            <strong>Language</strong>
                          </div>
                          <div className="col text-center">
                            <strong>Price/month</strong>
                          </div>
                          <div className="col text-center">
                            <strong>Users</strong>
                          </div>
                        </div>
                        {item.channels &&
                          item.channels.map((ch, index) => (
                            <div className="row mb-3">
                              <div className="col">
                                <img src={ch.pictureUrl} alt={ch.name} />
                              </div>
                              <Link
                                to={`/channel/${ch.id}`}
                                className="col text-dark text-center"
                              >
                                <strong>{ch.name}</strong>
                              </Link>
                              <div className="col"> {ch.description} </div>
                              <div className="col text-center">
                                {ch.channelGenre}
                              </div>
                              <div className="col text-center">
                                {' '}
                                {ch.channelLanguage}
                              </div>
                              <div className="col text-center">
                                {' '}
                                <strong>Rs. {ch.price}</strong>
                              </div>
                              <div className="col text-center">
                                {' '}
                                <strong>{ch.numberOfUsers}</strong>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Vendors;
