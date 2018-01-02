import React, { Component } from 'react';
import AnimateOnScroll from '../AnimateOnScroll';

class Parallax extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0,     // Container Height
      y: 40,         // Parallax Pos
      scrollStart: this.props.start || null // Start the animation
    }

    this.offset = this.props.offset;  // Offset ( Instead of starting at 0 )
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.setContainerHeight();
    this.parallax()
  }

  componentWillReceiveProps(newProps) {
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
    let speed = this.props.speed || 0.12;

    let pos = relativeToElementPos * speed; // New Postion
    pos += this.offset;                     // Plus offset

    this.setState({ y: pos });
  }

  setContainerHeight() {
    // Match the height of sibling div
    let newHeight = document.querySelector(this.props.parentContainer).clientHeight ||
                      document.querySelector(this.props.parentContainer).offsetHeight;

    this.setState({ height: newHeight });
  }

  render() {
    return (
      <div
           style={ { height: `${this.state.height}px` } }>
        <div className='parallax'
             style={ {
               transform: `translateY(${this.state.y}px)`
             } }>
          <img
            className={ this.props.imgClass ? `${this.props.imgClass}` : 'default' }
            src={this.props.imgSrc} alt=""/>
        </div>
      </div>
    );
  }
}

export default AnimateOnScroll(Parallax);
