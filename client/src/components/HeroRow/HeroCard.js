// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
      <Link
        to={`/the-team/${hero.id}`}>
        <div className='hero-card'>
          <img src={hero.acf.full_superhero} alt=""/>

          <div className='info white'>
            <h3 className='arvo title'>

                <span>
                  { hero.acf.name }
                </span>

            </h3>
            <p className='lato white'>

                { hero.acf.title }

            </p>
          </div>

        </div>
      </Link>
    );
  }
}

// HeroCard.propTypes = propTypes;

export default HeroCard;
