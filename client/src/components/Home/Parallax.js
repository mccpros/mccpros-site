import React, { Component } from 'react';
import AnimateOnScroll from '../AnimateOnScroll';

class Parallax extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0,     // Container Height
      y: 40,       // Parallax Pos
      scrollStart: 0 // Start the animation
    }

    this.offset = 40;  // Offset ( Instead of starting at 0 )
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.setContainerHeight();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if(this.props.animated && !this.state.scrollStart) {
      // As soon as the Element is on screen
      // Set start point
      return this.setState({ scrollStart: window.scrollY }, this.parallax);
    }

    if(this.props.animated) {
      // If we already have a start, go for it
      this.parallax();
    }
  }

  parallax() {
    let scrollPos = window.scrollY; // Current scroll
    let relativeToElementPos = this.state.scrollStart - scrollPos; // Plus starting position
    let speed = 0.12;

    let pos = relativeToElementPos * speed; // New Postion
    pos += this.offset;                     // Plus offset

    this.setState({ y: pos });
  }

  setContainerHeight() {
    // Match the height of sibling div
    let newHeight = document.querySelector('.offer-container').clientHeight ||
                      document.querySelector('.offer-container').offsetHeight;

    this.setState({ height: newHeight });
  }

  render() {
    return (
      <div className='col-xs-3 parallax-wrapper'
           style={ { height: `${this.state.height}px` } }>
        <div className='parallax'
             style={ {

               transform: `translateY(${this.state.y}px)`
             } }>
          <img style={{
              marginLeft: '-3em',
              height: '1150px'
            }} src="/assets/hero.png" alt=""/>
        </div>
      </div>
    );
  }
}

export default AnimateOnScroll(Parallax);
