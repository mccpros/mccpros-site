// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// We should probably check prop types
// const propTypes = {
//
// };

class FooterEnd extends Component {
  componentWillMount() {
    // Start with an action
    this.props.fetchPartners();
  }

  mapPartnerImages() {
    return this.props.partners.map((p, i) => {
      return (
          <img
            key={i}
            width='120px'
            src={p.acf.logo} alt=""/>
      )
    })
  }

  render() {
    return (
      <div className='footer-container'>
        <div className='partners center'>
          <div className='row'>

            <h3 className='arvo blue'>Our Partners</h3>
            <div className='footer-images-wrapper'>
              { this.props.partners ?
                this.mapPartnerImages() :
                'Loading...' }
            </div>

            <hr />

            <div className='footer-nav'>
              <Link
                className='arvo'
                to='/about'>ABOUT</Link>
              <Link
                className='arvo'
                to='/services'>SERVICES</Link>
              <Link
                className='arvo'
                to='/programs'>PROGRAMS</Link>
              <Link
                className='arvo'
                to='/clients'>CLIENTS</Link>
              <Link
                className='arvo'
                to='/support'>CONTACT</Link>
            </div>

            <hr />

            <div className='footer-contact'>
              <img src='/assets/mcc.png' alt=""/>
              <div className='right arvo'>
                <div>
                  Email: <a href='mailto:connect@mccpros.com'>connect@mccpros.com</a>
                </div>
                <div>
                  Phone: <a href='tel:18773656800'>1-877-365-6800</a>
                </div>


                <div className='social'>
                  <a
                    href='facebook.com'>
                    <i className="icon-facebook"></i>
                  </a>
                  <a
                    href='twitter.com'>
                    <i className="icon-twitter"></i>
                  </a>
                  <a
                    href='linkedin.com'>
                    <i className="icon-linkedin"></i>
                  </a>
                </div>

              </div>
            </div>

            <div className='copyright arvo blue'>
              Copyright {(new Date()).getFullYear()} Merino Computer Concepts. All Rights Reserved.
            </div>

          </div>
        </div>
      </div>
    );
  }
}

// FooterEnd.propTypes = propTypes;

export default FooterEnd;
