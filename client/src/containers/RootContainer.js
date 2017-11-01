import React from 'react';
import { connect } from 'react-redux';

// Most actions should happen right here
// Let all the data fall to Child through props
import { fetchInfo } from '../actions/WPInfoActions';
import Root from '../components/Root';

// Don't render much in containers
// But pass the props!
const RootContainer = props => <Root {...props} />;

// Where store/state becomes our props
const mapStateToProps = (state) => {
  const { router, wpInfo } = state; // Pull it out

  return { // Pass it along
    router,
    wpInfo,
  };
};

export default connect(mapStateToProps, {
  fetchInfo
})(RootContainer);
