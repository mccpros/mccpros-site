// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as Animated from 'react-dom-animated';
import Easing from '../../../../node_modules/animated/lib/Easing';

import HeroCard from './HeroCard';
// We should probably check prop types
// const propTypes = {
//
// };

class HeroRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anim: new Animated.Value(0),
      animateWidth: 0,
      animationOff: window.innerWidth < 1025
    };

    this.handleHover = this.handleHover.bind(this);
    this.endHover = this.endHover.bind(this);
  }

  componentDidMount() {

  }

  componentWillReceiveProps(newProps) {
    if(newProps.heroes && newProps.heroes.length > 0) {
      this.setWidth(newProps.heroes); // Set width of div and animation
    }
  }

  setWidth(heroes) {
    let animateWidth = window.innerWidth > 380 ?
                        380 * heroes.length : // Dynamic width based on hero count
                        window.innerWidth * heroes.length;

    if(!this.state.animateWidth || animateWidth > this.state.animateWidth) {
      this.setState({ animateWidth });
    }
  }

  handleHover(right) {
    this.state.anim.stopAnimation(value => { // Stops animation
      Animated.timing(this.state.anim, {     // Starts animation
        toValue: right ? 1 : 0,  // Checks if left or right
        easing: Easing.in(),     // Ease in
        duration: this.state.animationOff ? 6000 : 10000
      }).start();
    });
  }

  endHover() {
    this.state.anim.stopAnimation();
  }

  render() {
    let { heroes } = this.props;
    let style = {
      width: `${this.state.animateWidth}px`,
      transform: Animated.template`
        translateX(${this.state.anim.interpolate({
          inputRange: [0, 1],                                    // Range 0 - 1
          outputRange: ['0px', `-${this.state.animateWidth - window.innerWidth}px`]  // 0 === '0px' & 1 === 'totalWidth'
        })})
      `
    };

    return (
      <div className='hero-component'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-8 col-offset-md-2'>
              <h2 className='title arvo green'>Meet the IT Superheroes</h2>
            </div>
          </div>
        </div>

        <div className='controller-wrapper'>
          <div
            onMouseOver={() => this.handleHover(false)}
            onMouseOut={this.endHover}
            className='hero-control icon-left-open-mini'></div>
          <div
            onMouseOver={() => this.handleHover(true)}
            onMouseOut={this.endHover}
            className='hero-control icon-right-open-mini'></div>

          <div
            className='hero-row-container'
            id='hero-scroll'
            style={{ overflow: this.state.animationOff ? 'scroll' : 'hidden' }}>

            <Animated.div
              style={ style }
              className='hero-row'>
              { heroes &&
                heroes.map((h, idx) => {
                  return (
                    <HeroCard
                      hero={h}
                      key={idx} />
                    )
                  })
                }
              </Animated.div>
          </div>

        </div>
      </div>
    );
  }
}

// HeroRow.propTypes = propTypes;

export default HeroRow;
