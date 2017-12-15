// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { animateScroll } from 'react-scroll'

import NavContainer     from '../containers/NavContainer';
import FooterContainer  from '../containers/FooterContainer';

import Loader from './Loader';
import HeroRow from './HeroRow';
import Parallax from './Home/Parallax';
// We should probably check prop types
// const propTypes = {
//
// };

class HeroPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      awaitLoad: 3,
      selectedHero: { id: null },
      pageLoaded: false
    }

    this.loaded = 0

    this.loadComplete = this.loadComplete.bind(this);
  }

  componentWillMount() {
    // Start with an action
    this.props.fetchHeroes();
  }

  componentWillReceiveProps(newProps) {
    let heroId = window.location.pathname.split('/')[2];
    if(newProps.heroes && (!this.state.selectedHero.id || this.state.selectedHero.id !== heroId)) {

      if(!this.state.pageLoaded) {
        this.setState({ pageLoaded: true });
        setTimeout(this.props.loadComplete, 0);
      }

      newProps.heroes.forEach(h => {
        if(h.id === parseInt(heroId) &&
            this.state.selectedHero.id !== h.id) {
          animateScroll.scrollToTop();
          this.setState({ selectedHero: h });
        };
      })
    }
  }

  loadComplete() {
    this.loaded++;

    if(this.loaded === this.state.awaitLoad) {
      this.props.loadComplete();
    }
  }

  renderHero() {
    let hero = this.state.selectedHero;
    let stats = [hero.acf.stats_1,hero.acf.stats_2,hero.acf.stats_3,hero.acf.stats_4];

    return (
      <div className='hero-wrapper'>
        <div className='container-fluid no-padding'>
          <div className='row background'>

            <div className='col-xs-12 col-sm-offset-6 col-sm-6'>
              <div>
                <h1 className='arvo white'>{ hero.acf.name }</h1>
                <p className='arvo green hero-title'>{ hero.acf.title }</p>
              </div>
            </div>

          </div>

          <div className='row banner'>

            <div className='col-xs-12 col-md-6'>
              <div className='col-xs-2 col-sm-6'>
                <Parallax
                  speed={ 0.12 }
                  offset={ 40 }
                  parentContainer='.row'
                  imgClass='hero-page-parallax'
                  imgSrc={ hero.acf.full_superhero }
                  />
              </div>

              <div className='col-xs-10 col-sm-6'>
                <div className="stats-wrapper">
                  <h2 className='arvo white'>Superhero Stats</h2>

                    { stats.map((s, idx) => {
                        if(!s || s === undefined) return <div key={idx}></div>;
                        let label = s.split('|')[0];
                        let percent = s.split('|')[1];
                        return (
                          <div key={idx}>
                            <p className='lato white label'>{label}</p>
                            <Meter
                              percent={percent/100}
                              animate={true}
                              width={200}
                              color={'#20b789'}/>
                          </div>
                        )
                      })}

                </div>
              </div>
            </div>

            <div className='col-xs-12 col-md-6 hidden-xs relative'>
              <div className='hero-info'>
                <p className='hero-label lato green'>EXPERTISE:</p>
                <p className='white lato'>{hero.acf.expertise}</p>
              </div>
              <div className='hero-info'>
                <p className='hero-label lato green'>CERTIFIED:</p>
                <p className='white lato'>{hero.acf.certified}</p>
              </div>
              <div className='hero-info'>
                <p className='hero-label lato green'>EXPERIENCE:</p>
                <p className='white lato'>{hero.acf.experience}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className='page-container'>

        <NavContainer
          loadComplete={ this.loadComplete }
          {...this.props} />
        <div id='pageWrapper'>
          <div className='page-container'>

            { this.state.selectedHero.id && this.renderHero() }

            <HeroRow {...this.props}/>

            <FooterContainer
              loadComplete={ this.loadComplete }/>

          </div>
        </div>
      </div>
    );
  }
}

var Meter = function (props) {
  var {
    percent = 0,         // a number between 0 and 1, inclusive
    width = 100,         // the overall width
    height = 20,         // the overall height
    rounded = false,      // if true, use rounded corners
    color = '#0078bc',   // the fill color
    animate = false,     // if true, animate when the percent changes
    label = null         // a label to describe the contents (for accessibility)
  } = props;

  var r = rounded ? Math.ceil(height / 2) : 0;
  var w = percent ? Math.max(height, width * Math.min(percent, 1)) : 0;
  var style = animate ? { 'transition': 'width 500ms, fill 250ms' } : null;

  return (
    <svg width={width} height={height + 4} aria-label={label}>
      <rect width={width + 4} height={height + 4} fill='#ccc' rx={r} ry={r}/>
      <rect width={w} height={height} fill={color} x='2' y='2' rx={r} ry={r} style={style}/>
    </svg>
  );
};

// HeroPage.propTypes = propTypes;

export default HeroPage;
