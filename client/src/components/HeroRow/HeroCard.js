// import PropTypes from 'prop-types';
import React, { Component } from 'react';

// We should probably check prop types
// const propTypes = {
//
// };

class HeroCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { hero } = this.props;

    return (
      <div className='hero-card'>
        <img src={hero.acf.full_superhero} alt=""/>

        <div className='info white'>
          <h3 className='arvo title'>
            { hero.acf.name }
          </h3>
          <p className='lato'>
            <a
              className='white'
              href="/">
              { hero.acf.title }
            </a>
          </p>
        </div>

      </div>
    );
  }
}

// HeroCard.propTypes = propTypes;

export default HeroCard;
