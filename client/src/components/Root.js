// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BrowserRouter, Router } from 'react-router-dom';

import RouterComponent from '../components/Router';
// We should probably check prop types
// const propTypes = {
//
// };

class Root extends Component {
  componentWillMount() {
    // Start with an action
    this.props.fetchInfo();
    this.props.fetchPages();
    this.props.fetchHeroes();
  }

  render() {
    return (
        <BrowserRouter>
          <div>

            <RouterComponent {...this.props} />

          </div>
        </BrowserRouter>
    );
  }
}

// Root.propTypes = propTypes;

export default Root;
