import React from 'react';
import { connect } from 'react-redux';

// Most actions should happen right here
// Let all the data fall to Child through props
import { fetchPages} from '../actions/WPInfoActions';
import Nav from '../components/Nav';

// Don't render much in containers
// But pass the props!
const FooterContainer = props => <Nav {...props} />;

// Where store/state becomes our props
const mapStateToProps = (state) => {
  const { pages } = state.wpInfo; // Pull it out
  
  return { // Pass it along
    pages
  };
};

export default connect(mapStateToProps, {
  fetchPages,
})(FooterContainer);
