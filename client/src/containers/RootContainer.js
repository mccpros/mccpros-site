/*
  On first load, grab the important stuff
  Fetch heroes,
        pages,
        and WPInfo (i.e. site name, author and stuff)

        Go to './components/Root'
        to follow the heirarchy
*/

import React from 'react';
import { connect } from 'react-redux';

// Most actions should happen right here
// Let all the data fall to Child through props
import { fetchInfo, fetchPages, fetchHeroes } from '../actions/WPInfoActions';
import * as routes from '../constants/RouteConstants';
import Root from '../components/Root';

// Don't render much in containers
// But pass the props!
const RootContainer = props => <Root {...props} />;

// Where store/state becomes our props
const mapStateToProps = (state) => {
  const { data, heroes, pages } = state.wpInfo; // Pull it out

  return { // Pass it along
    wpInfo: data,
    heroes,
    pages,
  };
};

export default connect(mapStateToProps, {
  fetchInfo,
  fetchPages,
  fetchHeroes
})(RootContainer);
