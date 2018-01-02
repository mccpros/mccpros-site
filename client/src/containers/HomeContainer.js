import React from 'react';
import { connect } from 'react-redux';

// Most actions should happen right here
// Let all the data fall to Child through props
import { fetchHome } from '../actions/WPInfoActions';

import PageTranstion from '../components/Transitions/PageTransition';
import Home from '../components/Home';

// Don't render much in containers
// But pass the props!
const HomeContainer = props => <Home {...props} />;

// Where store/state becomes our props
const mapStateToProps = (state) => {
  const { home, testimonials } = state.wpInfo; // Pull it out
  //
  return { // Pass it along
    home,
    testimonials
  };
};

export default connect(mapStateToProps, {
    fetchHome,
  })(HomeContainer);
