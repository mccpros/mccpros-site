import React from 'react';
import { connect } from 'react-redux';

// Most actions should happen right here
// Let all the data fall to Child through props
import { fetchOnePage } from '../actions/WPInfoActions';

import PageTranstion from '../components/Transitions/PageTransition';
import GetSupport from '../components/GetSupport';

// Don't render much in containers
// But pass the props!
const SupportContainer = props => <GetSupport {...props} />;

// Where store/state becomes our props
const mapStateToProps = (state) => {
  const { page } = state.wpInfo; // Pull it out

  return { // Pass it along
    page
  };
};

export default PageTranstion(
  connect(mapStateToProps, {
  fetchOnePage,
})(SupportContainer));
