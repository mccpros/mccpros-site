// import PropTypes from 'prop-types';
import React, { Component } from 'react';

import HomeCanvas from './HomeCanvas';
// We should probably check prop types
// const propTypes = {
//
// };

class Home extends Component {

  render() {
    return (
      <div className='home-wrapper'>
        <HomeCanvas />

        <div className="home-cta-wrapper">
          <div className='home-cta'></div>
        </div>

        <div className='home-content'>

          <div className='what-container'>
            <h2 className='arvo title black'>
              <span className='green'>what</span> we do
            </h2>
          </div>

        </div>
      </div>
    );
  }
}

// Home.propTypes = propTypes;

export default Home;
