import React from 'react';
import { connect } from 'react-redux';

// Most actions should happen right here
// Let all the data fall to Child through props
import { fetchHeroes, fetchPartners } from '../actions/WPInfoActions';
import Footer from '../components/Footer';

// Don't render much in containers
// But pass the props!
const FooterContainer = props => <Footer {...props} />;

// Where store/state becomes our props
const mapStateToProps = (state) => {
  const { heroes, partners } = state.wpInfo; // Pull it out
  return { // Pass it along
    heroes,
    partners
  };
};

export default connect(mapStateToProps, {
  fetchHeroes,
  fetchPartners,
})(FooterContainer);
