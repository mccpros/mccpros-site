// import PropTypes from 'prop-types';
import React, { Component } from 'react';

import NavContainer     from '../../containers/NavContainer';
import FooterContainer  from '../../containers/FooterContainer';

import TransitionWrapper from '../Transitions/TransitionWrapper';
import Loader from '../Loader';
import Content from './Content';

// We should probably check prop types
// const propTypes = {
//
// };

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      awaitLoad: 3
    }
    this.loaded = 0

    this.loadComplete = this.loadComplete.bind(this);
  }

  componentWillMount() {
    // Start with an action
    this.props.fetchOnePage(this.props.pageId);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.page && newProps.page.id) {
      setTimeout(this.props.loadComplete, 0);
      // this.props.loadComplete();
    }
  }

  loadComplete() {
    this.loaded++;

    if(this.loaded === this.state.awaitLoad) {
      this.props.loadComplete();
    }
  }

  render() {
    return (
      <div className='page-container'>
        <NavContainer
          loadComplete={ this.loadComplete }
          {...this.props} />

        <div id="pageWrapper">

          <div className="page-parent">
            { this.props.page && this.props.page.id ?
              <Content
                loadComplete={ this.loadComplete }
                {...this.props} /> :
                <TransitionWrapper><Loader /></TransitionWrapper> }
          </div>

          <FooterContainer
            loadComplete={ this.loadComplete }
            {...this.props} />

        </div>
      </div>
    );
  }
}

// Page.propTypes = propTypes;

export default Page;

// <div className='page-container'>
//   <NavContainer {...this.props} />
//   <div id="pageWrapper">
//     { this.props.page ?
//       <Content {...this.props} /> :
//       <Loader />
//
//         <FooterContainer />
//   </div>
// </div>
