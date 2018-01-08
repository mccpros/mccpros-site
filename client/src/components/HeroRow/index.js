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
      animationOff: window.innerWidth < 1025,
      scrollLocation: 0,
      left: true
    };

    this.isMobile = (() => {
      var check = false;
      ((a)=>{if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    })();

    this.handleHover = this.handleHover.bind(this);
    this.endHover = this.endHover.bind(this);
    this.startSideScroll = this.startSideScroll.bind(this);
    this.stopSideScroll = this.stopSideScroll.bind(this);
    this.sideScroll = this.sideScroll.bind(this);
    this.scrolling = this.scrolling.bind(this);
    this.setScrollLocation = this.setScrollLocation.bind(this);
    this.setEndTouch = this.setEndTouch.bind(this);
  }

  componentDidMount() {
    if(this.isMobile) {
      this.startSideScroll();
      this.scrollLimit = this.scrollContainer.scrollWidth - window.innerWidth;
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.heroes && newProps.heroes.length > 0) {
      this.setWidth(newProps.heroes); // Set width of div and animation
    }
  }

  setWidth(heroes) {
    let animateWidth = window.innerWidth > 380 ?
                        380 * heroes.length : // Dynamic width based on hero count
                        360 * heroes.length;


    if(!this.state.animateWidth || animateWidth > this.state.animateWidth) {
      this.setState({ animateWidth });
    }
  }

  handleHover(right) {
    this.state.anim.stopAnimation(value => { // Stops animation
      Animated.timing(this.state.anim, {     // Starts animation
        toValue: right ? 1 : 0,  // Checks if left or right
        easing: Easing.in(),     // Ease in
        duration: 5000
      }).start();
    });
  }

  endHover() {
    this.state.anim.stopAnimation();
  }

  startSideScroll() {
    this.setScrollLocation();

    clearInterval(this.state.interval);
    this.setState({
      interval: setInterval(this.sideScroll, 35),
      manual: false
    });
  }

  stopSideScroll() {
    if(!this.state.manual) {
      this.setState({ manual: true });
      clearTimeout(this.state.timeout);
      clearInterval(this.state.interval);
    }
  }

  sideScroll() {
    if(this.scrollLimit < this.scrollContainer.scrollWidth) {
      this.scrollLimit = this.scrollContainer.scrollWidth - window.innerWidth;
    }

    if(this.scrollLimit <= this.state.scrollLocation) {
      this.setState({ left: false });
    }
    if(this.state.scrollLocation <= 0) {
      this.setState({ left: true });
    }

    if(this.state.left) {
      this.setState({ scrollLocation: this.state.scrollLocation + 1 }, () => {
        this.scrollContainer.scrollLeft = this.state.scrollLocation;
      });
    } else {
      this.setState({ scrollLocation: this.state.scrollLocation - 1 }, () => {
        this.scrollContainer.scrollLeft = this.state.scrollLocation;
      });
    }
  }

  scrolling() {
    this.stopSideScroll();
  }

  setScrollLocation() {
     let location = this.scrollContainer.scrollLeft;
     this.setState({ scrollLocation: location });
  }

  setEndTouch() {
    clearTimeout(this.state.timeout);
    this.setState({ timeout: setTimeout(this.startSideScroll, 3500)  });
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
            ref={(scrollContainer) => { this.scrollContainer = scrollContainer }}
            onTouchStart={ this.stopSideScroll }
            onTouchMove={ this.scrolling }
            onTouchEnd={ this.setEndTouch }
            className='hero-row-container'
            id='hero-scroll'
            style={{ overflow: this.state.animationOff && this.state.manual ? 'scroll' : 'hidden' }}>

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
