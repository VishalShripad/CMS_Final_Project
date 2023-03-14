import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Role } from '../../utils/enum';
import vendor from '../../assets/images/vendorDashboard1.png';
import customer from '../../assets/images/customerDashboard.png';
import Colors_dhamaka from '../../assets/images/Colors_dhamaka.jpg';
import English_dhamaka from '../../assets/images/English_dhamaka.jpg';
import Kids_dhamaka from '../../assets/images/Kids_dhamaka.jpg';
import News_dhamaka from '../../assets/images/News_dhamaka.png';
import Sports_dhamaka from '../../assets/images/Sports_dhamaka.jpg';
import Star_dhamaka from '../../assets/images/Star_dhamaka.jpg';
import Zee_dhamaka from '../../assets/images/Zee_dhamaka.jpg';
//import javascriptDashboard from '../../assets/images/javascriptDashboard.png';

const Dashboard = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log("In dashboard funtion");
  return (
    <>
      {user && user.role === Role.Admin ? (
        <>
          <div className="container">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="card h-100 shadow-sm">
                  <Link to="/admin/vendors" className="text-decoration-none">
                    <img
                      src={vendor}
                      alt="vendors"
                      style={{ height: '500px' }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h3 className="text-uppercase">Vendors</h3>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card h-100 shadow-sm">
                  <Link to="/admin/userdata" className="text-decoration-none">
                    <img
                      src={customer}
                      alt="customers"
                      style={{ height: '500px' }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h3 className="text-uppercase">Customers</h3>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="3"
                  aria-label="Slide 4"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="4"
                  aria-label="Slide 5"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="5"
                  aria-label="Slide 6"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="6"
                  aria-label="Slide 7"
                ></button>
              </div>
              <div style={{ height: '700px' }} className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={Colors_dhamaka}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={English_dhamaka}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={Kids_dhamaka}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={News_dhamaka}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={Sports_dhamaka}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={Star_dhamaka}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={Zee_dhamaka}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
              </div>
            </div>
            <br />
            <div className="d-grid">
              <Link
                to="/channels"
                className="btn btn-outline-info text-center btn-lg"
              >
                Catalog
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
