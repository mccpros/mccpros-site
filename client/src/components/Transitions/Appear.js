import React, { Component } from 'react';
import * as Animated from 'react-dom-animated';

const Appear = WrappedComponent => class Appear
 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animate: new Animated.Value(0)
    };

    this.duration = 400;
  }

  // Coming in
  componentWillAppear(cb) {
    Animated.timing(this.state.animate, { toValue: 1, duration: 200 }).start();
    cb();
  }

  // Coming in
  componentWillEnter(cb) {
    setTimeout(
      () => {
        Animated.timing(this.state.animate, { toValue: 1, duration: 200 }).start()
      },
      250
    );

    cb();
  }

  // Coming out
  componentWillLeave(cb) {
    Animated.timing(this.state.animate, { toValue: 0, duration: this.duration }).start();
    setTimeout(() => cb(), this.duration);
  }

  render() {
    const style = {
      opacity: Animated.template`${this.state.animate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0', '1']
     })}`
    };

    return (
      <Animated.div style={style} className='animated-page-wrapper'>
        <WrappedComponent {...this.props} />
      </Animated.div>
    );
  }
};

export default Appear;
