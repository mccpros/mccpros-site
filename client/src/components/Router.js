import React, { Component } from 'react';
import { Route, Switch } from 'react-router';

// All Containers( controls data ) in app
import HomeContainer from '../containers/HomeContainer';
import PageContainer from '../containers/PageContainer';
import MeetTheTeamContainer from '../containers/MeetTheTeamContainer';
import HeroContainer from '../containers/HeroContainer';
import TestimonialContainer from '../containers/TestimonialContainer';
import SupportContainer from '../containers/SupportContainer';

// All top layer components
import PageNotFound from './404';
import Loader from './Loader';

// Allows animations
import TransitionWrapper from './Transitions/TransitionWrapper';

class Router extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialLoading: true, // Loading flag for this components
      componentsLoading: true // Loading flag for chosen route
    };

    this.loadComplete = this.loadComplete.bind(this);
    this.componentLoadComplete = this.componentLoadComplete.bind(this);
  }

  componentWillReceiveProps(newProps) {
    // Remove loader when top layer is loaded
    if (newProps && newProps.wpInfo && newProps.heroes && newProps.pages) {
      this.loadComplete();
    }
  }

  loadComplete() {
    this.setState({ initialLoading: false });
  }

  componentLoadComplete() {
    // When child component loads
    this.setState({ componentsLoading: false });
  }

  renderRoutes() {
    let { pages } = this.props;

    return pages.map((page, idx) => {
      switch (page.url) {
        // Meet-the-team page
        // Go to '../containers/MeetTheTeamContainer'
        case '/meet-the-team':
          return (
            <Route
              key={idx}
              path={page.url}
              children={({ match, ...rest }) => (
                <TransitionWrapper>
                  {match && (
                    <MeetTheTeamContainer
                      pageId={page.content_id}
                      loadComplete={this.componentLoadComplete}
                      {...this.props}
                    />
                  )}
                </TransitionWrapper>
              )}
            />
          );
        // Testimonial page
        // Go to '../containers/TestimonialContainer'
        case '/testimonials':
          return (
            <Route
              key={idx}
              path={page.url}
              children={({ match, ...rest }) => (
                <TransitionWrapper>
                  {match && (
                    <TestimonialContainer
                      pageId={page.content_id}
                      loadComplete={this.componentLoadComplete}
                      {...this.props}
                    />
                  )}
                </TransitionWrapper>
              )}
            />
          );
        // Support page
        // Go to '../containers/SupportContainer'
        case '/support':
          return (
            <Route
              key={idx}
              path={page.url}
              children={({ match, ...rest }) => (
                <TransitionWrapper>
                  {match && (
                    <SupportContainer
                      pageId={page.content_id}
                      loadComplete={this.componentLoadComplete}
                      {...this.props}
                    />
                  )}
                </TransitionWrapper>
              )}
            />
          );
        // Every Other page
        // Go to '../containers/PageContainer'
        default:
          return (
            <Route
              key={idx}
              path={page.url}
              children={({ match, ...rest }) => (
                <TransitionWrapper>
                  {match && (
                    <PageContainer
                      pageId={page.content_id}
                      loadComplete={this.componentLoadComplete}
                      {...this.props}
                      {...this.state}
                      {...rest}
                    />
                  )}
                </TransitionWrapper>
              )}
            />
          );
      }
    });
  }

  render() {
    return (
      <div className="body-wrapper">
        <TransitionWrapper className="load-transition">
          {this.state.initialLoading || this.state.componentsLoading ? (
            <Loader reversed={true} />
          ) : null}
        </TransitionWrapper>

        <Switch>
          {/* Home page
          Go to '../containers/HomeContainer' */}
          <Route
            path="/"
            exact={true}
            children={({ match, ...rest }) => (
              <TransitionWrapper>
                {match && (
                  <HomeContainer
                    loadComplete={this.componentLoadComplete}
                    title="Home"
                    {...this.props}
                  />
                )}
              </TransitionWrapper>
            )}
          />
          {/* Superhero page
            Go to '../containers/HeroContainer' */}
          <Route
            path="/the-team/:id"
            render={props => {
              return (
                <HeroContainer
                  loadComplete={this.componentLoadComplete}
                  {...props}
                  {...this.props}
                />
              );
            }}
          />

          {this.props.pages && this.renderRoutes()}

          {/* 404 page
            Go to '../components/404' */}
          <Route
            children={({ match, ...rest }) => (
              <TransitionWrapper>
                {match && (
                  <PageNotFound loadComplete={this.componentLoadComplete} {...this.props} />
                )}
              </TransitionWrapper>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default Router;
