/* Home page
    Who We Work With section */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Slider from 'react-slick';

class WhoWeWorkWith extends Component {
  renderSlides() {
    let { testimonials } = this.props.home;

    return testimonials.map((t, i) => {
      return (
        <div key={i}>
          <div className="quote-container">
            <h3 className="arvo title">{t.company_name}</h3>
            <p className="lato">{t.quote}</p>
          </div>
        </div>
      );
    });
  }

  render() {
    let { home } = this.props;
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <div className="container-fluid who-container">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 who_we_work_with">
              <h2 className="title arvo black">
                <span className="green">who</span> we work with
              </h2>

              <Slider
                nextArrow={<ArrowButton arrowName="icon-right-open-mini" />}
                prevArrow={<ArrowButton arrowName="icon-left-open-mini" />}
                {...settings}
              >
                {this.renderSlides()}
              </Slider>

              <div className="who-button-wrapper">
                <Link to="/testimonials">
                  <button className="arvo white">Read On</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class ArrowButton extends Component {
  render() {
    return <i onClick={this.props.onClick} className={this.props.arrowName} />;
  }
}

export default WhoWeWorkWith;
