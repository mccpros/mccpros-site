// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import OfferItem from './OfferItem';

// We should probably check prop types
// const propTypes = {
//
// };

class OfferList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonPos: '0',
      href: '/',
      positionName: 'center',
      center: {
        href: '/',
        pos: '0'
      },
      left: {
        href: '/ramp',
        pos: '0'
      },
      right: {
        href: '/procare',
        pos: '0'
      }
    }

    this.getPositions = this.getPositions.bind(this);
    this.hoverHandler = this.hoverHandler.bind(this);
    this.resetButtonPos = this.resetButtonPos.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.getPositions);

    this.buttonWrapper = document.getElementById('buttonWrapper'),
    this.button = document.getElementById('learnButton'),
    this.container = document.getElementById('what_we_offer'),

    this.getPositions();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getPositions);
  }

  getPositions() {
    let buttonWidth = this.button.clientWidth || this.button.offsetWidth;

    let fullWidth = this.buttonWrapper.clientWidth || this.buttonWrapper.offsetWidth;

    let centerPos = (fullWidth  - buttonWidth) * .50;
    let leftPos = (fullWidth - buttonWidth / 2) * .2;
    let rightPos = (fullWidth  - buttonWidth / 2) * .74;

    this.setState({
      buttonPos: centerPos,
      center: { ...this.state.center, pos: centerPos },
      left: { ...this.state.left, pos: leftPos },
      right: { ...this.state.right, pos: rightPos }
    })
  }

  hoverHandler(e) {
    let containerWidth = this.container.offsetWidth || this.container.clientWidth;
    let threshold = containerWidth / 2;

    if(e.pageX < threshold) {
      this.setState({
        buttonPos: this.state.left.pos,
        href: this.state.left.href,
        positionName: 'left'
      });
    } else {
      this.setState({
        buttonPos: this.state.right.pos,
        href: this.state.right.href,
        positionName: 'right'
      });
    };
  }

  resetButtonPos() {
    this.setState({
      buttonPos: this.state.center.pos,
      href: this.state.center.href,
      positionName: 'center'
    });
  }

  render() {
    return (
     <div
       onMouseMove={ this.hoverHandler }
       onMouseLeave={ this.resetButtonPos }
       className='what_we_offer'
       id='what_we_offer'>
        <OfferItem
          {...this.state}
          oppPosition='right'
          data={ {
            name: 'ramp',
            desc: 'Lorem upsume dolor sit amet, consectetur adipiscing elit. Nunc vel iaculis elit. Fusce vehicula turpis massa, eu suscupit erat commodo eget.',
            details: ['Lorem ipsum dolor sit amet', 'Nunc vel ialculis elit', 'Fusce vehicula turpis massa', 'Nunc vel ialculis elit']
        } } />

        <hr className='offer-break'/>

        <OfferItem
          {...this.state}
          oppPosition='left'
          data={ {
            name: 'procare',
            desc: 'Lorem upsume dolor sit amet, consectetur adipiscing elit. Nunc vel iaculis elit. Fusce vehicula turpis massa, eu suscupit erat commodo eget.',
            details: ['Lorem ipsum dolor sit amet', 'Nunc vel ialculis elit', 'Fusce vehicula turpis massa', 'Nunc vel ialculis elit']
        } } />

        <div id='buttonWrapper' className='offer-button-wrapper relative'>
          <a href={ this.state.href }>
            <button
              id='learnButton'
              className='arvo'
              style={ {
                left: `${this.state.buttonPos}px`
              } }
              >Learn More</button>
          </a>
        </div>

      </div>
    );
  }
}

// OfferList.propTypes = propTypes;

export default OfferList;
