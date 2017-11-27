// import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Content from '../Page/Content.js';
import HeroRow from '../HeroRow';

import NavContainer     from '../../containers/NavContainer';
import FooterContainer  from '../../containers/FooterContainer';

// We should probably check prop types
// const propTypes = {
//
// };

class MeetTheTeam extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchOnePage(this.props.pageId);
    this.props.fetchHeroes();
  }

  renderHeroLineUp() {
    let { heroes } = this.props;

    let fullWidth = window.innerWidth;
    let heroAmount = heroes.length;
    let heroWidth = fullWidth / heroAmount;

    heroes.sort((a, b) => a.acf.order - b.acf.order);

    return heroes.map((h, i) => {
      let offsetWidth = parseInt(h.acf.offset_width);
      let offsetLeft  = parseInt(h.acf.offset_left) * (heroWidth / 100);
      let offsetTop   = parseInt(h.acf.offset_top)  * (heroWidth / 100);

      return (
        <div
          key={ i }
          style={{
            width: `${heroWidth}px`,
            zIndex: h.acf.z_index
          }}
          className='meet-hero-wrapper'>
          <img
            style={{
              width: `${130 + offsetWidth}%`,
              left: `${offsetLeft}px`,
              top: `${offsetTop}px`
            }}
            src={h.acf.full_superhero} alt=""/>
        </div>
      )
    })
  }

  render() {
    let { page } = this.props;

    return (
      <div className='meet-the-team-page'>
        <NavContainer {...this.props} />

        <div id="pageWrapper">
          <div className='city-wrapper'>
            <img src='/assets/city.png' alt=""/>
              <div className='heroes-wrapper'>
                { this.props.heroes ?
                  this.renderHeroLineUp() :
                  'Loading...' }
              </div>

          </div>

          <div className='page'>
            { page ?
              <Content {...this.props} /> :
                'Loading...'
              }
          </div>

          <HeroRow {...this.props} />

          <FooterContainer />
        </div>
      </div>
    );
  }
}

// MeetTheTeam.propTypes = propTypes;

export default MeetTheTeam;
