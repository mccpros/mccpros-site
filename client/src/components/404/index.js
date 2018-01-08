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
      show: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: true });
      this.props.loadComplete();
    }, 1000);
  }

  render() {
    return (
      <div
        style={{ opacity: this.state.show ? 1 : 0 }}
        className='404-page'>

        <NavContainer {...this.props} />

        <div id='pageWrapper'>

          <div className='page-parent'>

            <div className='pageNotFound lato'>
              <div>
                <h2 className='title arvo blue'>404</h2>
              </div>
              <img src='/assets/404.png' alt='MCC Superheroes 404'/>
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
