// import PropTypes from 'prop-types';
import React, { Component } from 'react';

import AnimateOnScroll from '../AnimateOnScroll';
import Segment from './Segment';

// We should probably check prop types
// const propTypes = {
//
// };

class PieChart extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <svg width='100%' viewBox='125 125 150 150' id='pie-1' className='pie'>
        <circle className='pie-ring' cx='200' cy='200' r='15.91549430918952' fill='transparent' stroke='#d2d3d4' strokeWidth='100'></circle>

        <Segment
            {...this.props}
            color='#8064a2'
            dasharray0={101}
            dasharray1={0} />

        <Segment
            {...this.props}
            color='#34cfa9'
            dasharray0={28}
            dasharray1={72} />

        <Segment
            {...this.props}
            color='#c0504d'
            dasharray0={14}
            dasharray1={86} />

        <Segment
            {...this.props}
            color='#4f81bd'
            dasharray0={7}
            dasharray1={93} />


        <circle className='pie-hole' cx='200' cy='200' r='36.7887357729738' fill='#fff'></circle>

        <Text
          {...this.props}
          x='140'
          y='210'
          percent='72%' />

        <Text
          {...this.props}
          x='206'
          y='155'
          percent='7%'/>

        <Text
          {...this.props}
          x='225'
          y='165'
          percent='7%'/>

        <Text
          {...this.props}
          x='240'
          y='190'
          percent='14%' />

      </svg>
    );
  }
}

class Text extends Component {
  render() {
    return(
      <text
        x={ this.props.x }
        y={ this.props.y }
        className={ this.props.animated
                    ? 'percent-text animate mcc-show'
                    : 'percent-text mcc-hide' }
        fontFamily='Lato'
        fontSize='8'
        fontWeight='100'
        fill='#fff'>
        { this.props.percent }
      </text>
    );
  }
}
// PieChart.propTypes = propTypes;

export default AnimateOnScroll(PieChart);
