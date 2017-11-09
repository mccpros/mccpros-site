import React, { Component } from 'react';
import AnimateOnScroll from '../AnimateOnScroll';

class Parallax extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0,
      y: -100,
      scrollStart: 0
    }

    this.offset = -80,
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.getHeight();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if(this.props.animated && !this.state.scrollStart) {
      return this.setState({ scrollStart: window.scrollY }, this.parallax);
    }

    if(this.props.animated) {
      this.parallax();
    }
  }

  parallax() {
    let scrollPos = window.scrollY;
    let relativeToElementPos = this.state.scrollStart - scrollPos;
    let speed = 0.13;

    let pos = relativeToElementPos * speed;
    pos += this.offset;

    this.setState({ y: pos });
  }

  getHeight() {
    let newHeight = document.querySelector('.offer-container').clientHeight ||
                      document.querySelector('.offer-container').offsetHeight;

    this.setState({ height: newHeight + 1 });
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
              marginLeft: '-10em',
              height: '1150px'
            }} src="/assets/hero.png" alt=""/>
        </div>
      </div>
    );
  }
}

export default AnimateOnScroll(Parallax);
