// import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Canvas from './Canvas';
import WhatLi from './WhatLi';
import PieChart from './PieChart';
import Legend from './Legend';
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
        <WhatLi key={idx} name={w} />
      );
    });
  }

  renderHome() {
    let { home } = this.props;
    console.log(home);

    return (
      <div className='home-wrapper'>

        <Canvas />

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
                  { this.renderWhats(/*home.acf.what_we_do*/ 'what we do|we do what|do what we') }
                </ul>

              </div>

              <div className='col-xs-12 col-md-7'>

                <h4 className='what-title arvo'>we solve a majority of problems in 15 minutes or less</h4>

              <div className="col-xs-4">
                <Legend />
              </div>

              <div className="col-xs-8">
                <PieChart />
              </div>

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
