// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route } from 'react-router';

import HomeContainer from '../containers/HomeContainer';
import PageContainer from '../containers/PageContainer';
import MeetTheTeamContainer from '../containers/MeetTheTeamContainer';
import HeroContainer from '../containers/HeroContainer';
import TestimonialContainer from '../containers/TestimonialContainer';
import SupportContainer from '../containers/SupportContainer';

import TransitionWrapper from './Transitions/TransitionWrapper';
import Loader from './Loader';
// We should probably check prop types
// const propTypes = {
//
// };

class Router extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialLoading: true,
      componentsLoading: true
    }

    this.loadComplete = this.loadComplete.bind(this);
    this.componentLoadComplete = this.componentLoadComplete.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if(newProps && newProps.wpInfo && newProps.heroes && newProps.pages) {
      this.loadComplete();
    }
  }

  loadComplete() {
    this.setState({ initialLoading: false });
  }

  componentLoadComplete() {
    this.setState({ componentsLoading: false });
  }

  renderRoutes() {
    let { pages } = this.props;

    return pages.map((page, idx) => {
      switch (page.acf.url) {
        case '/meet-the-team':
          return (
            <Route
              key={idx}
              path={page.acf.url}
              children={({ match, ...rest}) => (
                <TransitionWrapper>
                  { match && <MeetTheTeamContainer
                                pageId={ page.id }
                                loadComplete={ this.componentLoadComplete }
                                {...this.props} /> }
                </TransitionWrapper>
              )} />
          );
        case '/testimonials':
          return (
            <Route
              key={idx}
              path={page.acf.url}
              children={({ match, ...rest}) => (
                <TransitionWrapper>
                  { match && <TestimonialContainer
                                pageId={ page.id }
                                loadComplete={ this.componentLoadComplete }
                                {...this.props} /> }
                </TransitionWrapper>
              )} />
          );
        case '/support':
          return (
            <Route
              key={idx}
              path={page.acf.url}
              children={({ match, ...rest}) => (
                <TransitionWrapper>
                  { match && <SupportContainer
                                pageId={ page.id }
                                loadComplete={ this.componentLoadComplete }
                                {...this.props} /> }
                </TransitionWrapper>
              )} />
          );
        default:
          return (
            <Route
              key={idx}
              path={page.acf.url}
              children={({ match, ...rest }) => (
                  <TransitionWrapper>
                    {match && <PageContainer
                                pageId={page.id}
                                loadComplete={ this.componentLoadComplete }
                                {...this.props}
                                {...rest} />}
                  </TransitionWrapper>
              )} />
          );
      }
    });
  }

  render() {
    return (
      <div className='body-wrapper'>

        <TransitionWrapper
          className='load-transition'>
          { this.state.initialLoading || this.state.componentsLoading ?
            <Loader reversed={ true } /> :
            null }
        </TransitionWrapper>

        <Route
          path='/'
          exact={ true }
          children={({ match, ...rest }) => (
            <TransitionWrapper>
              { match && <HomeContainer
                          loadComplete={ this.componentLoadComplete }
                          title='Home'
                          {...this.props} />
              }
            </TransitionWrapper>
          )} />

        <Route
          path='/the-team/:id'
          children={({ match, ...rest }) => (
            <TransitionWrapper>
              { match && <HeroContainer
                            loadComplete={ this.componentLoadComplete }
                            {...match}
                            {...this.props} />
              }
            </TransitionWrapper>
          )} />

          { this.props.pages && this.renderRoutes() }

      </div>
    );
  }
}

// Router.propTypes = propTypes;

export default Router;
