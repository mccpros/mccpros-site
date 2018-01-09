/*
  Root of whole App

  Go to './components/Router'
  to follow the heirarchy
*/

import React, { Component } from 'react';
import { BrowserRouter, Router } from 'react-router-dom';

import RouterComponent from '../components/Router';

class Root extends Component {
  componentWillMount() {
    // Call all the actions
    
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

export default Root;
