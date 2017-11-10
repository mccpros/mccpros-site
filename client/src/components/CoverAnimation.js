// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AnimateOnScroll from './AnimateOnScroll';
// We should probably check prop types
// const propTypes = {
//
// };

class CoverAnimation extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div
        className={ this.props.animated ?
                    'animated-cover appear' :
                    'animated-cover disappear' }></div>
    );
  }
}

// CoverAnimation.propTypes = propTypes;

export default AnimateOnScroll(CoverAnimation);
