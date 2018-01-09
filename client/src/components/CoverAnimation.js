/* Reveal Animation
    Starts on scrolled into view */
import React, { Component } from 'react';
import AnimateOnScroll from './AnimateOnScroll';

class CoverAnimation extends Component {

  render() {
    return (
      <div
        className={ this.props.animated ?
                    'animated-cover appear' :
                    'animated-cover disappear' }></div>
    );
  }
}

export default AnimateOnScroll(CoverAnimation);
