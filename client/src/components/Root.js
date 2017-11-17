// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Router from '../components/Router';
// We should probably check prop types
// const propTypes = {
//
// };

class Root extends Component {
  componentWillMount() {
    // Start with an action
    this.props.fetchInfo();
    this.props.fetchPages();
  }

  render() {
    return (
      <BrowserRouter>
        <div>

          <Router {...this.props} />

        </div>
      </BrowserRouter>
    );
  }
}

// Root.propTypes = propTypes;

export default Root;
