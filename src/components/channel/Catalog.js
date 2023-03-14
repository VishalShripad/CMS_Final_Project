import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetCartItems } from '../../actions/cartActions';
import {
  GetChannelGenre,
  GetChannelLanguages,
  GetChannels,
} from '../../actions/channelActions';
import Channel from '../../pages/Channel';
import Loader from '../layout/Loader';
import Pagination from 'react-js-pagination';
import isEmpty from '../../validation/is-empty';

function Catalog() {
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name');
  const [genre, setGenre] = useState('');
  const [language, setLanguage] = useState('');
  let [keyword, setKeyword] = useState('');

  const { loading, channels, pagination, genres, languages } = useSelector(
    (state) => {
      console.log("In Catalog useSelector loading, channels, pagination, genres, languages");
      return state.channel
    }
  );

  let pages = !isEmpty(pagination) ? JSON.parse(pagination) : {};

  const { updateCart, cart } = useSelector((state) => {
    console.log("In Catalog useSelector updateCart, cart");
    return state.cart
  });

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("In Catalog useEffect updateCart");
    if (updateCart === true) {
      dispatch(GetCartItems());
    }
  }, [updateCart]);

  useEffect(() => {
    console.log("In Catalog useEffect dispatch");
    dispatch(GetChannelGenre());
    dispatch(GetChannelLanguages());
  }, [dispatch]);

  useEffect(() => {
    console.log("In Catalog useEffect dispatch, pageNumber, keyword, sort, genre, language");
    dispatch(GetChannels(pageNumber, keyword, sort, genre, language));
  }, [dispatch, pageNumber, keyword, sort, genre, language]);

  function searchHandler(e) {
    console.log("In Catalog searchHandler");
    e.preventDefault();
    setKeyword(search);
  }

  function setCurrentPageNumber(pageNumber) {
    console.log("In Catalog setCurrentPageNumber");
    setPageNumber(pageNumber);
  }

  function resetSearch(e) {
    console.log("In Catalog resetSearch");
    e.preventDefault();
    setSearch('');
    setKeyword('');
    setGenre('');
    setLanguage('');
  }
  console.log("In Catalog function");
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row">
            <section className="col-3">
              <h5 className="text-warning ms-3">Sort</h5>
              <select
                className="form-select mb-4"
                onChange={(e) => setSort(e.target.value)}
                value={sort}
                style={{ cursor: 'pointer' }}
              >
                <option value={'name'} defaultValue>
                  Alphabetical
                </option>
                <option value={'ascending'}>Price: Low to High</option>
                <option value={'descending'}>Price: High to Low</option>
              </select>

              <h5 className="text-warning ms-3">Genre</h5>
              <ul className="list-group my-3">
                <ul className="list-group my-3">
                  {genres &&
                    genres.map((gen) => (
                      <li
                        className="list-group-item"
                        style={{ cursor: 'pointer' }}
                        key={gen.id}
                        onClick={() => setGenre(gen.id)}
                      >
                        {gen.name}
                      </li>
                    ))}
                </ul>
              </ul>

              <h5 className="text-warning ms-3">Language</h5>
              <ul className="list-group my-3">
                {languages &&
                  languages.map((lan) => (
                    <li
                      className="list-group-item"
                      style={{ cursor: 'pointer' }}
                      key={lan.id}
                      onClick={() => setLanguage(lan.id)}
                    >
                      {lan.name}
                    </li>
                  ))}
              </ul>
            </section>
            <section className="col-9">
              <div className="d-flex justify-content-between align-items-center pb-2">
                <header>
                  {!isEmpty(pages) ? (
                    <span>
                      Showing{' '}
                      <strong>
                        {(pages.currentPage - 1) * pages.itemsPerPage + 1} -{' '}
                        {pages.currentPage * pages.itemsPerPage >
                        pages.totalItems
                          ? pages.totalItems
                          : pages.currentPage * pages.itemsPerPage}
                      </strong>{' '}
                      of <strong>{pages.totalItems}</strong> Results
                    </span>
                  ) : (
                    <></>
                  )}
                </header>
                <div className="d-flex mt-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="form-control me-2"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                  />
                  <button
                    className="btn btn-outline-primary mx-2"
                    onClick={searchHandler}
                  >
                    Search
                  </button>
                  <button
                    className="btn btn-outline-success"
                    onClick={resetSearch}
                  >
                    Reset
                  </button>
                </div>
              </div>
              <div className="row g-3">
                {channels &&
                  channels.map((channel) => (
                    <Channel key={channel.id} channel={channel} />
                  ))}
              </div>
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
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default Catalog;
