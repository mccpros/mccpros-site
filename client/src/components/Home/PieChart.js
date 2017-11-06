// import PropTypes from 'prop-types';
import React, { Component } from 'react';

import AnimateOnScroll from '../AnimateOnScroll';
import Segment from './Segment';

// We should probably check prop types
// const propTypes = {
//
// };

class WhatLi extends Component {
  constructor(props) {
    super(props);

  }

  componentWillReceiveProps() {

  }

  render() {
    return (
      <svg width='500' height='500' viewBox='125 125 150 150' id='pie-1' className='pie'>
        <circle className='pie-ring' cx='200' cy='200' r='15.91549430918952' fill='transparent' stroke='#d2d3d4' strokeWidth='100'></circle>

        <Segment
          color='#8064a2'
          dasharray0='101'
          dasharray1='0' />

        <Segment
            color='#8064a2'
            dasharray0='28'
            dasharray1='72'/>

        <Segment
            color='#c0504d'
            dasharray0='14'
            dasharray1='86'/>

        <Segment
            color='#4f81bd'
            dasharray0='7'
            dasharray1='93'/>


        <circle className='pie-hole' cx='200' cy='200' r='36.7887357729738' fill='#fff'></circle>
        <text x='140' y='210' className='percent-text' fontFamily='Roboto' fontSize='8' fontWeight='100' fill='#fff'>
          72%
        </text>
        <text x='206' y='155' className='percent-text' fontFamily='Roboto' fontSize='8' fontWeight='100' fill='#fff'>
          7%
        </text>
        <text x='225' y='165' className='percent-text' fontFamily='Roboto' fontSize='8' fontWeight='100' fill='#fff'>
          7%
        </text>
        <text x='240' y='190' className='percent-text' fontFamily='Roboto' fontSize='8' fontWeight='100' fill='#fff'>
          14%
        </text>
      </svg>
    );
  }
}

// WhatLi.propTypes = propTypes;

export default AnimateOnScroll(WhatLi);
