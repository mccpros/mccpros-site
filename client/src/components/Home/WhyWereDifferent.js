// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CoverAnimation from '../CoverAnimation';
// We should probably check prop types
// const propTypes = {
//
// };

class WhyWereDifferent extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className='why_were_different'>

        <div className='col-xs-12 col-md-6 no-padding'>

          <div className='why-heroes-img'></div>

        </div>

        <div className='col-xs-12 col-md-6 different-container'>

          <div className='different-text black left lato'>
            <h2 className='arvo title'>
              <span className="green">why</span> we're different
            </h2>

            <p>Supportive.</p>
            <p>We utilize technology to be as user-friendly as possible, resulting
            in users with the ability to solve basic problems themselves. We acheive
            this by creating intuitive systems and supplying users with cutting-edge tools.</p>
            <p>With custom built applications like <a href='/learningportal'>The Learning Portal</a>,
            we allow our customers to stay independent and knowledgable about their environment.</p>
          </div>


          <h4 className='stylized-header arvo'>
            supportive
            <CoverAnimation />
          </h4>
        </div>
      </div>
    );
  }
}

// WhyWereDifferent.propTypes = propTypes;

export default WhyWereDifferent;
