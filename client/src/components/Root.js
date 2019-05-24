/*
  Root of whole App

  Go to './components/Router'
  to follow the heirarchy
*/

import React, { Component } from 'react';
import { BrowserRouter, Router } from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';

import RouterComponent from '../components/Router';

class Root extends Component {
  componentWillMount() {
    // Call all the actions
    this.props.fetchPages();
    this.props.fetchHeroes();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <RouterComponent {...this.props} />
          <CookieConsent
            containerClasses="cookie-consent-container"
            contentClasses="cookie-consent-content lato"
            buttonClasses="cookie-consent-button"
            buttonText="I Accept"
          >
            This website uses cookies to enhance the user experience.&nbsp;
            <a
              target="_blank"
              className="cookie-consent-link"
              href="https://www.cookiepolicygenerator.com/live.php?token=pwQXSCJR0lICnB53xn4Vre7Vd47dEXcu"
            >
              Our cookie policy.
            </a>
          </CookieConsent>
        </div>
      </BrowserRouter>
    );
  }
}

export default Root;
