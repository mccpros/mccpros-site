// import PropTypes from 'prop-types';
import React, { Component } from 'react';

// We should probably check prop types
// const propTypes = {
//
// };

class Segment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dasharray0: 0,
      dasharray1: 101,
    }

  }

  componentWillReceiveProps(newProps) {
    if(newProps.animated) {

      this.setState({ dasharray0: this.props.dasharray0 });
      this.setState({ dasharray1: this.props.dasharray1 });
      
    }
  }

  renderDashArray() {
    let { dasharray0, dasharray1 } = this.state;

    return `${dasharray0} ${dasharray1}`;
  }

  render() {
    return (
      <circle
        className='pie-segment'
        cx='200'
        cy='200'
        r='15.91549430918952'
        fill='transparent'
        stroke={this.props.color}
        strokeWidth='100'
        strokeDasharray={ this.renderDashArray() }
        strokeDashoffset='25'></circle>
    );
  }
}

// Segment.propTypes = propTypes;

export default Segment;
