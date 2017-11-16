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
      buttonPos: '0',         // Current Position <- this is what will change
      href: '/',              // Current Link
      positionName: 'center', // Track Position by Name
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
    if(window.innerWidth < 768) return;

    window.addEventListener('resize', this.getPositions);  // Changes Variables

    // Grab Elements
    this.buttonWrapper = document.getElementById('buttonWrapper'),
    this.button        = document.getElementById('learnButton'),
    this.container     = document.getElementById('what_we_offer'),

    this.getPositions(); // Set Variables
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getPositions);
  }

  getPositions() {
    // Grab button width because it changes things
    let buttonWidth = this.button.clientWidth || this.button.offsetWidth;

    // Grab width of container
    let fullWidth = this.buttonWrapper.clientWidth || this.buttonWrapper.offsetWidth;

    let centerPos = (fullWidth - buttonWidth) * .50;    // When this button is centered
    let leftPos   = (fullWidth - buttonWidth / 2) * .2;  // When the button should be left
    let rightPos  = (fullWidth - buttonWidth / 2) * .74;// When the button should be right

    this.setState({
      buttonPos: centerPos,
      center: { ...this.state.center, pos: centerPos },
      left:   { ...this.state.left,   pos: leftPos },
      right:  { ...this.state.right,  pos: rightPos }
    })
  }

  hoverHandler(e) {
    if(window.innerWidth < 991) return;

    let containerWidth = this.container.offsetWidth || this.container.clientWidth;
    let threshold = containerWidth / 2; // Grab the middle of container

    if(e.pageX < threshold) {
      // If left
      this.setState({
        buttonPos: this.state.left.pos,
        href: this.state.left.href,
        positionName: 'left'
      });

    } else {
      // If right
      this.setState({
        buttonPos: this.state.right.pos,
        href: this.state.right.href,
        positionName: 'right'
      });

    };
  }

  resetButtonPos() {
    // Center if not hovering
    this.setState({
      buttonPos: this.state.center.pos,
      href: this.state.center.href,
      positionName: 'center'
    });
  }

  render() {
    return (
      <div className='col-xs-12 col-md-9 offer-container white'>
        <h2 className='arvo title white'>what we <span className="green">offer</span></h2>
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
                className='arvo white'
                style={ {
                  left: `${this.state.buttonPos}px`
                } }
                >Learn More</button>
            </a>
          </div>

        </div>
      </div>
    );
  }
}

// OfferList.propTypes = propTypes;

export default OfferList;
