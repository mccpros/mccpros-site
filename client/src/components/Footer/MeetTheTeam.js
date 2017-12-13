// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// We should probably check prop types
// const propTypes = {
//
// };

class MeetTheTeam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heroIndex: null
    }
  }

  componentWillMount() {
    // Start with an action
    if(!this.props.heroes) {
      this.props.fetchHeroes();
    }
  }

  renderHero() {
    let superheroes = this.props.heroes;
    let hero;

    if(!hero) {
      hero = superheroes[Math.floor(Math.random() * superheroes.length)];
    }

    return (
      <div
        className='meet-the-team relative'>
        <div className='row'>
          <div className='col-xs-12 col-lg-6'>
            <h2 className='arvo title white'>
              <Link to='/meet-the-team'>
                <span>
                  meet the <span className='green'>team</span>
                </span>
              </Link>
            </h2>
            <p className='desc white lato'>At Merino Computer Concepts, your organization isn't supported by one expert,
              but an entire team. Our dedicated staff is a venerable "Avengers" of IT Superheroes.
              Each Superhero has unique skills to prevent and solve common problems.</p>
          </div>

          <div id='getHeight' className='col-xs-12 col-lg-6 relative'>

            <div className='col-xs-offset-1 col-xs-3 col-lg-offset-0 col-lg-3 hero-label white relative'>

              <div>
                <Link to={`/the-team/${hero.id}`}>
                  <p className='arvo'>{hero.acf.name}</p>
                </Link>

                <hr/>
                
                <Link to={`/the-team/${hero.id}`}>
                  <p className='lato'>{hero.acf.title}</p>
                </Link>
              </div>

            </div>

            <Link to={`/the-team/${hero.id}`}>
              <img
                className='col-xs-8 col-lg-9'
                src={hero.acf.close_up} alt=""/>
            </Link>

          </div>

        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        { this.props.heroes &&
          this.renderHero() }
      </div>
    );
  }
}

// MeetTheTeam.propTypes = propTypes;

export default MeetTheTeam;
