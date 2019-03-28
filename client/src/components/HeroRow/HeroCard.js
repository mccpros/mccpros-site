/* Meet-the-Team/Hero page
    Hero Card */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HeroCard extends Component {
  render() {
    let { hero } = this.props;

    return (
      <Link to={`/the-team/${hero.content_id}`}>
        <div className="hero-card">
          <img src={hero.full_superhero} alt="Merino Computer Concepts Superhero Card" />

          <div className="info white">
            <h3 className="arvo title">
              <span>{hero.name}</span>
            </h3>
            <p className="lato white">{hero.title}</p>
          </div>
        </div>
      </Link>
    );
  }
}

export default HeroCard;
