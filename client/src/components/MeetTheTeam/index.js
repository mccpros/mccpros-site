/* Meet the Team page */

import React, { Component } from 'react';
import { animateScroll as Scroll } from 'react-scroll';

import NavContainer     from '../../containers/NavContainer';
import FooterContainer  from '../../containers/FooterContainer';

import TransitionWrapper from '../Transitions/TransitionWrapper';
import Loader from '../Loader';
import Content from '../Page/Content';
import HeroRow from '../HeroRow';

class MeetTheTeam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      headerImg: '',
      page: {},
      loading: true,
      show: false
    }
  }

  componentWillMount() {
    this.props.fetchOnePage(this.props.pageId);
    this.props.fetchHeroes();

    Scroll.scrollToTop();
  }

  componentWillReceiveProps(newProps) {
    if(newProps.page && newProps.page.id) {
      let headerImg = window.innerWidth > 1000 ?
                        newProps.page.acf.hero_image :
                        newProps.page.acf.mobile_header;
      delete newProps.page.acf.hero_image;

      // Preload Header Image
      this.preloadImg(headerImg)
        .then(() => {
          this.setState({
            headerImg,
            page: newProps.page,
            loading: false
          });

          setTimeout(() => this.setState({ show: true }), 400);
        })
    }
  }

  preloadImg(url) {
    // Basic JS asset preloader func
    return new Promise(function(resolve, reject) {
      let loader = new Image();

      loader.onload = resolve;
      loader.src = url;
    });
  }

  renderHeroLineUp() {
    let { heroes } = this.props;

    let fullWidth = window.innerWidth;
    let heroAmount = heroes.length;
    let heroWidth = fullWidth / heroAmount;

    heroes.sort((a, b) => a.acf.order - b.acf.order);

    return heroes.map((h, i) => {
      let offsetWidth = parseInt(h.acf.offset_width);
      let offsetLeft  = parseInt(h.acf.offset_left) * (heroWidth / 100);
      let offsetTop   = parseInt(h.acf.offset_top)  * (heroWidth / 100);

      return (
        <div
          key={ i }
          style={{
            width: `${heroWidth}px`,
            zIndex: h.acf.z_index
          }}
          className='meet-hero-wrapper'>
          <img
            style={{
              width: `${130 + offsetWidth}%`,
              left: `${offsetLeft}px`,
              top: `${offsetTop}px`
            }}
            src={h.acf.full_superhero} alt='Merino Computer Concepts Team'/>
        </div>
      )
    })
  }

  render() {
    return (
      <div className='meet-the-team-page'>

        <NavContainer {...this.props} />

        <div id='pageWrapper'>
          <div className='city-wrapper'>

            <div
              style={{ opacity: this.state.show ? 1 : 0 }}
              className='meet-title'>
              <h1
                className='arvo white'>Meet the MCC Superhero Team</h1>
            </div>

            <div className='team-img-skel'>
              { this.state.headerImg ?
                <img
                  style={{ opacity: this.state.show ? 1 : 0 }}
                  src={ this.state.headerImg }
                  alt='MCC Team' /> :
                  <TransitionWrapper><Loader /></TransitionWrapper> }
            </div>

            <div className='heroes-wrapper'></div>

          </div>

          <div
            className='page-parent meet-the-team'
            style={{ minHeight: this.state.loading ? '100vh' : '0vh' }}>

            { this.props.page && this.props.page.id && this.state.headerImg &&
                <Content {...this.props} /> }

          </div>

          <HeroRow {...this.props} />

          <FooterContainer {...this.props} />

        </div>
      </div>
    );
  }
}

export default MeetTheTeam;
