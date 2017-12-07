// import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Appear from '../Transitions/Appear';
// We should probably check prop types
// const propTypes = {
//
// };

class Loader extends Component {


  render() {
    return (
      <div
        className={`loader ${this.props.reversed ? 'reversed' : ''}`}>
        <ul
          className={`loading ${this.props.reversed ? 'reversed' : ''}`}>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    );
  }
}

// Loader.propTypes = propTypes;

export default Appear(Loader);
