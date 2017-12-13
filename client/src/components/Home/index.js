// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.props.fetchHome();
  }

  componentWillReceiveProps(newProps) {
    if(newProps.home) {
      this.props.loadComplete();
    }
  }

  renderHome() {
    return (
      <div id="pageWrapper">
        <div className='home-wrapper'>

          <Canvas />

          <div className="home-cta-wrapper">
            <div className='home-cta'>

              <div className='home-header-title'>
                <h2 className="arvo white">
                  Your IT Department. <br/>
                  Superpowered.
                </h2>

                <h3 className='lato white'>
                  <span>Live Helpdesk.</span><br/>
                  <span>24/7 Monitoring</span><br/>
                  <span>Proactive Support.</span>
                </h3>

                <Link to='/support'>
                  <button className='btn white arvo'>Get Support</button>
                </Link>

              </div>
            </div>
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

        <FooterContainer
          {...this.props} />

      </div>
    );
  }

  render() {
    return (
      <div className="home-container">
        <div>

          <NavContainer
            {...this.props} />

              { this.props.home ?
                this.renderHome() :
                null
              }

        </div>
      </div>
    );
  }
}

// Home.propTypes = propTypes;

export default Home;
