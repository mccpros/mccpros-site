import React from 'react';
import { connect } from 'react-redux';

// Most actions should happen right here
// Let all the data fall to Child through props
import { fetchHeroes } from '../actions/WPInfoActions';
import MeetTheTeam from '../components/MeetTheTeam';

// Don't render much in containers
// But pass the props!
const MeetTheTeamContainer = props => <MeetTheTeam {...props} />;

// Where store/state becomes our props
const mapStateToProps = (state) => {
  const { heroes } = state.wpInfo; // Pull it out

  return { // Pass it along
    heroes,
  };
};

export default connect(mapStateToProps, {
  fetchHeroes
})(MeetTheTeamContainer);
