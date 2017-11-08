// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AnimateOnScroll from '../AnimateOnScroll';

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
      <div>
        <h4 className={ this.props.animated ?
            'animate mcc-show what-title arvo black' :
            'mcc-hide what-title arvo black' }>
            we solve a majority of problems in 15 minutes or less
          </h4>

          <div className="col-xs-4">
            <div className={ this.props.animated ?
                'animate mcc-show legend' :
                'mcc-hide legend' }>

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
          </div>
      </div>
    );
  }
}

// Legend.propTypes = propTypes;

export default AnimateOnScroll(Legend);
