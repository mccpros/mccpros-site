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

  renderFooterNav() {
    let main = this.props.pages.filter(p => !p.acf.parent_page); // Parent Pages
    main.sort((a, b) => parseInt(a.acf.order) - parseInt(b.acf.order)); // Put them in order

    return (
      <div className='footer-nav'>

        { main.map((m, i) => {
            return <Link
                    className='lato'
                    key={i}
                    to={m.acf.url}>{m.title.rendered}</Link>
          })
        }

      </div>
    );
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

            { this.props.pages && this.props.pages.length > 0 &&
                this.renderFooterNav() }

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
                    target='_blank'
                    href='https://www.facebook.com/mccpros/'>
                    <i className="icon-facebook"></i>
                  </a>
                  <a
                    target='_blank'
                    href='https://twitter.com/mccpros'>
                    <i className="icon-twitter"></i>
                  </a>
                  <a
                    target='_blank'
                    href='https://www.linkedin.com/company/merino-computer-concepts/'>
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
