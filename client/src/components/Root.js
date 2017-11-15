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
  }

  renderInfo() {
    const { wpInfo } = this.props;

    // If loading, say it
    if(wpInfo && wpInfo.loading) {
      return 'Loading...';
    } else {
      return wpInfo.data.name;
    }
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
