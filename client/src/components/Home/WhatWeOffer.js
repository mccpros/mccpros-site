// import PropTypes from 'prop-types';
import React, { Component } from 'react';

import OfferList from './OfferList';
import Parallax from './Parallax';
// We should probably check prop types
// const propTypes = {
//
// };

class WhatWeOffer extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>

          <OfferList />

        <div className='parallax-wrapper col-xs-3'>
          <Parallax
            speed={ -0.08 }
            offset={ 40 }
            parentContainer='.offer-container'
            imgSrc='/assets/hero.png'
            />
        </div>

        </div>
      </div>

    );
  }
}

// WhatWeOffer.propTypes = propTypes;

export default WhatWeOffer;
