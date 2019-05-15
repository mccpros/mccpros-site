/* Home page
    What We Do section */
import React, { Component } from 'react';

import WhatLi from './WhatLi';

class WhatWeDo extends Component {
  renderWhats(whats) {
    // Maps <li>'s from wordpress
    let dividedWhats = [];
    whats = whats.split('|');
    while (whats.length) dividedWhats.push(whats.splice(0, 4));

    return dividedWhats.map((arr, idx) => {
      return (
        <div key={idx} className="col-xs-12 col-md-6 col-lg-3">
          {arr.map((w, i) => {
            return <WhatLi key={i} name={w} />;
          })}
        </div>
      );
    });
  }

  render() {
    let { home } = this.props;
    console.log('home:', home);

    return (
      <div className="what-container container-fluid">
        <div className="row">
          <div className="col-xs-12 col-md-10 col-md-offset-1">
            <h2 className="arvo title black relative">
              <span className="green">what</span> we do
              <div className="what-we-do-separator" />
            </h2>

            <ul className="what-list">{this.renderWhats(home.what_we_do)}</ul>
          </div>
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col-xs-12 col-md-10 col-md-offset-1">
            <h2 className="arvo title black right relative">
              <span className="health-red">healthcare</span> i.t.
              <div className="what-we-do-separator healthcare-separator" />
            </h2>

            <ul className="what-list what-list-healthcare">
              {this.renderWhats(home.what_we_do_healthcare)}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default WhatWeDo;
