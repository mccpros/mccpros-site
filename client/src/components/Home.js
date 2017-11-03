// import PropTypes from 'prop-types';
import React, { Component } from 'react';

import HomeCanvas from './HomeCanvas';
// We should probably check prop types
// const propTypes = {
//
// };

class Home extends Component {

  componentWillMount() {
    this.props.fetchHome();
  }

  renderWhats(whats) {
    return whats.split('|').map((w, idx) => {
      return (
        <div className="relative">
          <li>
            <p className='black-fade lato' key={idx}>{w}</p>
          </li>
        </div>
      );
    });
  }

  renderHome() {
    let { home } = this.props;
    console.log(home);

    return (
      <div className='home-wrapper'>

        <HomeCanvas />

        <div className="home-cta-wrapper">
          <div className='home-cta'></div>
        </div>

        <div className='home-content'>

          <div className='what-container container'>
            <div className="row">
              <div className="col-xs-12 col-md-5">
                <h2 className='arvo title black'>
                  <span className='green'>what</span> we do
                </h2>

                <ul className="what-list">
                  { this.renderWhats(home.acf.what_we_do) }
                </ul>

              </div>
            </div>
          </div>

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
