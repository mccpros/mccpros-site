/*
  <li> from what we do section
*/
import React, { Component } from 'react';

import AnimateOnScroll from '../AnimateOnScroll';

class WhatLi extends Component {
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

export default AnimateOnScroll(WhatLi);
