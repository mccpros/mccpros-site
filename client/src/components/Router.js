// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route } from 'react-router';

import HomeContainer from '../containers/HomeContainer';
import PageContainer from '../containers/PageContainer';
import MeetTheTeamContainer from '../containers/MeetTheTeamContainer';
// We should probably check prop types
// const propTypes = {
//
// };

class Router extends Component {
  constructor(props) {
    super(props);

  }

  renderRoutes() {
    let { pages } = this.props;

    return pages.map((page, idx) => {
      return (
        <Route
          key={idx}
          path={page.acf.url}
          render={props => {
            return <PageContainer pageId={page.id} {...this.props} />
          }} />
      );
    });
    // return routeKeys.map((routeName, idx) => {
    //
    //   return(
    //     <Route
    //       exact={ exact }
    //       key={idx}
    //       path={ route.path }
    //       render={(props) => {
    //         return <Component title={route.name} {...this.props} />;
    //       }} />
    //   );
    // })
  }

  render() {
    return (
      <div className='body-wrapper'>

      <Route
        path='/'
        exact={ true }
        render={(props) => {
          return <HomeContainer title='Home' {...this.props} />;
        }} />

      <Route
        path='/meet-the-team'
        render={(props) => {
          return <MeetTheTeamContainer {...this.props} />;
        }} />

        { this.props.pages ?
          this.renderRoutes() :
          'Loading...' }

      </div>
    );
  }
}

// Router.propTypes = propTypes;

export default Router;
