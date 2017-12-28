// import PropTypes from 'prop-types';
import React, { Component } from 'react';

import NavContainer     from '../../containers/NavContainer';
import FooterContainer  from '../../containers/FooterContainer';

import PageTranstion from '../Transitions/PageTransition';
import TransitionWrapper from '../Transitions/TransitionWrapper';
import Loader from '../Loader';
import Content from '../Page/Content';
import HeroRow from '../HeroRow';

// We should probably check prop types
// const propTypes = {
//
// };

class PageNotFound extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentWillMount() {
    // this.props.fetchOnePage(this.props.pageId);
    // this.props.fetchHeroes();
  }

  componentWillReceiveProps(newProps) {
    // if(newProps.page && newProps.page.id) {
    //   let headerImg = window.innerWidth > 1000 ?
    //                     newProps.page.acf.hero_image :
    //                     newProps.page.acf.mobile_header;
    //   delete newProps.page.acf.hero_image;
    //
    //   this.setState({
    //     headerImg,
    //     page: newProps.page
    //   });
    // }
    //
    // if(newProps.heroes && newProps.heroes.length) {
    // }
  }

  componentDidMount() {
    this.props.loadComplete();
  }

  render() {
    return (
      <div className='404-page'>

        <NavContainer {...this.props} />

        <div id='pageWrapper'>

          <div className='page-parent'>

            <div className='pageNotFound lato'>
              <div>
                <h2 className='title arvo blue'>404</h2>
              </div>
              <img src='/assets/404.png' alt='Superheroes 404'/>
              <div>
                <p>Page Not Found</p>
                <p>These aren't the superheroes you're looking for...</p>
              </div>
            </div>

          </div>

          <FooterContainer {...this.props} />

        </div>
      </div>
    );
  }
}

// PageNotFound.propTypes = propTypes;

export default PageTranstion(PageNotFound);
