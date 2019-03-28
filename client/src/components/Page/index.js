/* Page */
import React, { Component } from 'react';
import { animateScroll as Scroll } from 'react-scroll';

import NavContainer from '../../containers/NavContainer';
import FooterContainer from '../../containers/FooterContainer';

import TransitionWrapper from '../Transitions/TransitionWrapper';
import Loader from '../Loader';
import Content from './Content';

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentWillMount() {
    // Start with an action
    this.props.fetchOnePage(this.props.pageId);
    Scroll.scrollToTop();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.page && newProps.page.content_id && newProps.page.title) {
      this.props.loadComplete();
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <div className="page-container">
        <NavContainer {...this.props} />

        <div id="pageWrapper">
          <div className="page-parent" style={{ minHeight: this.state.loading ? '100vh' : '0vh' }}>
            {this.props.page && this.props.page.content_id && !this.state.loading ? (
              <Content loadComplete={this.loadComplete} {...this.props} />
            ) : (
              <TransitionWrapper>
                <Loader />
              </TransitionWrapper>
            )}
          </div>

          <FooterContainer {...this.props} />
        </div>
      </div>
    );
  }
}

// Page.propTypes = propTypes;

export default Page;
