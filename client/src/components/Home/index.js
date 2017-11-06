// import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Canvas from './Canvas';
import WhatLi from './WhatLi';
import PieChart from './PieChart';
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
  //
  // function initPieAnimation(pie) {
  //   let els = pie.childNodes;
  //   let segments = [];
  //   let text = [];
  //
  //   for (let key in els) {
  //     if(els.hasOwnProperty(key)) {
  //       let className = '';
  //       if(els[key].getAttribute) className = els[key].getAttribute('class')
  //
  //       if(className === 'pie-segment') segments.push(els[key]);
  //       if(className === 'percent-text') text.push(els[key]);
  //     }
  //   }
  //
  //   idToClass(segments);
  //   idToClass(text, 'percent-text show');
  // }
  //
  // function idToClass(arr, className) {
  //   for(let i = 0; i < arr.length; i++) {
  //     let id = className || arr[i].getAttribute('id');
  //     arr[i].setAttribute('class', id);
  //   }
  // }

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
                  { this.renderWhats(home.acf.what_we_do) }
                </ul>

              </div>

              <div className="col-xs-12 col-md-7">
                <PieChart />
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
