// import PropTypes from 'prop-types';
import React, { Component } from 'react';

import NavContainer     from '../../containers/NavContainer';
import FooterContainer  from '../../containers/FooterContainer';

import Content  from './Content';
// We should probably check prop types
// const propTypes = {
//
// };

class Page extends Component {

  componentWillMount() {
    // Start with an action
    this.props.fetchOnePage(this.props.pageId);
  }

  render() {
    return (
      <div className='page-container'>
        <NavContainer {...this.props} />
        <div id="pageWrapper">
          { this.props.page ?
            <Content {...this.props} /> :
              'Loading...' }

              <FooterContainer />
        </div>
      </div>
    );
  }
}

// Page.propTypes = propTypes;

export default Page;
