// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MeetTheTeam from './MeetTheTeam';
import FooterEnd from './FooterEnd';

// We should probably check prop types
// const propTypes = {
//
// };

class Footer extends Component {
  render() {
    return (
      <div>

        <MeetTheTeam {...this.props} />
        <FooterEnd   {...this.props} />

      </div>
    );
  }
}

// Footer.propTypes = propTypes;

export default Footer;
