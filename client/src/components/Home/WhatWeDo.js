// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CoverAnimation from '../CoverAnimation';

import WhatLi from './WhatLi';
import PieChart from './PieChart';
import Legend from './Legend';
// We should probably check prop types
// const propTypes = {
//
// };

class WhatWeDo extends Component {
  constructor(props) {
    super(props);

  }

  renderWhats(whats) {
    return whats.split('|').map((w, idx) => {
      return (
        <WhatLi key={idx} name={w} />
      );
    });
  }

  render() {
    let { home } = this.props;

    return (
      <div className='what-container container-fluid'>
        <div className="row">

          <div className="col-xs-12 col-md-4 col-md-offset-1">

            <h2 className='arvo title black'>
              <span className='green'>what</span> we do
            </h2>

            <ul className="what-list">
              { this.renderWhats(home.acf.what_we_do) }
            </ul>

          </div>

          <div className='col-xs-12 col-md-5 col-md-offset-1 pie-wrapper'>

            <Legend />

            <PieChart />

          </div>


        </div>
      </div>
    );
  }
}

// WhatWeDo.propTypes = propTypes;

export default WhatWeDo;
