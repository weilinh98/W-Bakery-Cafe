import React from 'react';

export default class Carousel extends React.Component {
  render() {
    return (
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-caption d-none d-md-block center-caption">
            <p>Welcome</p>
          </div>
          <div className="carousel-item active">
            <div className="d-block w-100 slide-1" />
          </div>
          <div className="carousel-item">
            <div className="d-block w-100 slide-2" />
          </div>
          <div className="carousel-item">
            <div className="d-block w-100 slide-3" />
          </div>
          <div className="carousel-item">
            <div className="d-block w-100 slide-4" />
          </div>
          <div className="carousel-item">
            <div className="d-block w-100 slide-5" />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon arrow-hover"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon arrow-hover"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  }
}
