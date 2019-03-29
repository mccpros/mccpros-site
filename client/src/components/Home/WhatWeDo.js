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

    return (
      <div className="what-container container-fluid">
        <div className="row">
          <div className="col-xs-12 col-md-10 col-md-offset-1">
            <h2 className="arvo title black">
              <span className="green">what</span> we do
            </h2>

            <ul className="what-list">{this.renderWhats(home.what_we_do)}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default WhatWeDo;
