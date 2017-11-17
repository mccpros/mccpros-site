// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route } from 'react-router';

import HomeContainer from '../containers/HomeContainer';
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


    return <div></div>;
    // return routeKeys.map((routeName, idx) => {
    //
    //   let route = routes[routeName];
    //   let Component = this.state[route.componentName];
    //   let exact = idx === 0 ? true : false;
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

        { this.props.pages ?
          this.renderRoutes() :
          'Loading...' }

      </div>
    );
  }
}

// Router.propTypes = propTypes;

export default Router;
