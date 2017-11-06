// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AnimateOnScroll from '../AnimateOnScroll';

// We should probably check prop types
// const propTypes = {
//
// };

class WhatLi extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className='relative'>
        <li className={ this.props.animated ? 'animate mcc-show' : 'mcc-hide' }>
          <p className='black-fade lato'>{this.props.name}</p>
        </li>
      </div>
    );
  }
}

// WhatLi.propTypes = propTypes;

export default AnimateOnScroll(WhatLi);
