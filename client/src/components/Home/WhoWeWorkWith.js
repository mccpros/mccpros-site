// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Slider from 'react-slick';

// We should probably check prop types
// const propTypes = {
//
// };

class WhoWeWorkWith extends Component {
  constructor(props) {
    super(props);
  }

  renderSlides() {
    let { testimonials } = this.props.home.acf;

    return testimonials.map((t, i) => {
      return (
        <div key={i}>
          <div className='quote-container'>
            <h3 className='arvo title'>{t.acf.company_name}</h3>
            <p className='lato'>
              { t.acf.quote }
            </p>
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
      <div className='container who-container'>
        <div className='row'>
          <div className='col-xs-12 who_we_work_with'>
            <h2 className='title arvo black'>
              <span className="green">who</span> we work with
            </h2>

            <Slider
              nextArrow={ <ArrowButton arrowName='icon-right-open-mini' /> }
              prevArrow={ <ArrowButton arrowName='icon-left-open-mini' /> }
              {...settings}>
              { this.renderSlides() }

            </Slider>

            <div className='who-button-wrapper'>
              <button className='arvo white'>Read On</button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

class ArrowButton extends Component {
  render() {
    return (
      <i
        onClick={this.props.onClick}
        className={this.props.arrowName}></i>
    )
  }
}

// WhoWeWorkWith.propTypes = propTypes;

export default WhoWeWorkWith;
