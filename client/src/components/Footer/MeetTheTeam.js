// import PropTypes from 'prop-types';
import React, { Component } from 'react';

// We should probably check prop types
// const propTypes = {
//
// };

class MeetTheTeam extends Component {

  componentWillMount() {
    // Start with an action
    this.props.fetchHeroes();
  }

  renderHero() {
    let superheroes = this.props.heroes;
    let hero = superheroes[Math.floor(Math.random() * superheroes.length)];

    return (
      <div
        className='meet-the-team relative'>
        <div className='row'>
          <div className='col-xs-6'>
            <h2 className='arvo title white'>
              meet the <span className='green'>team</span>
            </h2>
          </div>

          <div id='getHeight' className='col-xs-6 relative'>

            <div className='col-xs-3 hero-label white relative'>

              <div>
                <p className='arvo'>{hero.acf.name}</p>
                <hr/>
                <p className='lato'>{hero.acf.title}</p>
              </div>
            </div>

            <img
              className='col-xs-9'
              src={hero.acf.close_up} alt=""/>
          </div>

        </div>
      </div>
    )
  }

  render() {
    console.log(this.props);
    return (
      <div>
        { this.props.heroes ?
          this.renderHero() :
          'Loading...' }
      </div>
    );
  }
}

// MeetTheTeam.propTypes = propTypes;

export default MeetTheTeam;
