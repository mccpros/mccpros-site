import React from 'react';
import { connect } from 'react-redux';

// Most actions should happen right here
// Let all the data fall to Child through props
import { fetchHeroes, fetchOnePage } from '../actions/WPInfoActions';
import MeetTheTeam from '../components/MeetTheTeam';

// Don't render much in containers
// But pass the props!
const MeetTheTeamContainer = props => <MeetTheTeam {...props} />;

// Where store/state becomes our props
const mapStateToProps = (state) => {
  const { heroes, page } = state.wpInfo; // Pull it out

  return { // Pass it along
    heroes,
    page
  };
};

export default connect(mapStateToProps, {
  fetchHeroes,
  fetchOnePage
})(MeetTheTeamContainer);
