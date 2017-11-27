// import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Canvas from './Canvas';

import WhatWeDo         from './WhatWeDo';
import WhatWeOffer      from './WhatWeOffer';
import WhyWereDifferent from './WhyWereDifferent';
import WhoWeWorkWith    from './WhoWeWorkWith';
import NavContainer     from '../../containers/NavContainer';
import FooterContainer  from '../../containers/FooterContainer';

// We should probably check prop types
// const propTypes = {
//
// };

class Home extends Component {

  componentWillMount() {
    this.props.fetchHome();
  }

  renderHome() {
    return (
      <div>

        <NavContainer {...this.props} />

        <div id="pageWrapper">
          <div className='home-wrapper'>

            <Canvas />

            <div className="home-cta-wrapper">
              <div className='home-cta'></div>
            </div>

            <div className='home-content'>

              <WhatWeDo
                {...this.props} />

              <WhatWeOffer
                {...this.props} />

              <WhyWereDifferent
                {...this.props} />

              <WhoWeWorkWith
                {...this.props} />

            </div>
          </div>

          <FooterContainer />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="home-container">

        { this.props.home ?
          this.renderHome() :
          'Loading...' }

      </div>
    );
  }
}

// Home.propTypes = propTypes;

export default Home;
