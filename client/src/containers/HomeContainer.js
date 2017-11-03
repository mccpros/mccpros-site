import React from 'react';
import { connect } from 'react-redux';

// Most actions should happen right here
// Let all the data fall to Child through props
import { fetchHome } from '../actions/WPInfoActions';
import Home from '../components/Home';

// Don't render much in containers
// But pass the props!
const HomeContainer = props => <Home {...props} />;

// Where store/state becomes our props
const mapStateToProps = (state) => {
  const { wpInfo } = state; // Pull it out
  //
  return { // Pass it along
    home: wpInfo.home,
  };
};

export default connect(mapStateToProps, {
  fetchHome,
})(HomeContainer);
