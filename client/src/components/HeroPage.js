// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { animateScroll as Scroll } from 'react-scroll';

import NavContainer     from '../containers/NavContainer';
import FooterContainer  from '../containers/FooterContainer';

import TransitionWrapper from './Transitions/TransitionWrapper';
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
      selectedHero: { id: null },
      pageLoaded: false,
      show: false
    }

    this.isMobile = (() => {
      var check = false;
      ((a)=>{if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    })();
    if(!this.isMobile) this.isMobile = window.innerWidth <= 768;

    this.loadComplete = this.loadComplete.bind(this);
  }

  componentWillMount() {
    // Start with an action
    this.props.fetchHeroes();
    document.title = 'Meet the Team - Merino Computer Concepts';
  }

  componentWillReceiveProps(newProps) {
    let heroId = newProps.match.params.id;
    if(newProps.heroes && (!this.state.selectedHero.id || this.state.selectedHero.id !== heroId)) {

      newProps.heroes.forEach(h => {
        if(h.id === parseInt(heroId) &&
            this.state.selectedHero.id !== h.id) {
          this.setState({ selectedHero: h }, () => {
            setTimeout(() => Scroll.scrollToTop(), 100);
            setTimeout(() => {
              this.setState({ show: true })
              this.props.loadComplete();
            }, 500);
          });
        };
      })
    }
  }

  loadComplete() {
    this.props.loadComplete();
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

            <div className='row banner'>

              <div className='col-xs-12 col-md-6'>
                <div className='col-xs-2 col-sm-6'>

                  { this.isMobile ?
                    <img
                      className='mobile-hero-img'
                      src={hero.acf.full_superhero} alt='IT Superhero'/> :
                      <Parallax
                        start={ window.innerWidth < 768 ? -120 : -620 }
                        speed={ 0.12 }
                        offset={ 40 }
                        parentContainer='.row'
                        imgClass='hero-page-parallax'
                        imgSrc={ hero.acf.full_superhero }
                        />
                    }
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

                  <div className='col-xs-12 col-sm-6 col-sm-offset-6 col-md-offset-0 col-md-6 relative'>
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
      </div>
    );
  }

  render() {
    return (
      <div
        style={{ opacity: this.state.show ? 1 : 0 }}
        className='page-container'>

        <NavContainer {...this.props} />

        <div id='pageWrapper'>
          <div className='page-parent'>

            { this.state.selectedHero.id ?
                this.renderHero() :
                <TransitionWrapper><Loader /></TransitionWrapper> }
          </div>

            <HeroRow {...this.props}/>

            <FooterContainer {...this.props} />

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
