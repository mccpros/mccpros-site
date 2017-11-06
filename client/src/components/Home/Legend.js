// import PropTypes from 'prop-types';
import React, { Component } from 'react';

// We should probably check prop types
// const propTypes = {
//
// };

class Legend extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className='legend'>

        <div className='inline-block'>
          <div className='legend-square purp'></div>
          <div className="legend-text">0 to 15 min</div>
        </div>
        <div className='inline-block'>
          <div className='legend-square green'></div>
          <div className="legend-text">15 to 30 min</div>
        </div>
        <div className='inline-block'>
          <div className='legend-square red'></div>
          <div className="legend-text">30 to 60 min</div>
        </div>
        <div className='inline-block'>
          <div className='legend-square blue'></div>
          <div className="legend-text">Over 1 hour</div>
        </div>

      </div>
    );
  }
}

// Legend.propTypes = propTypes;

export default Legend;
