// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route } from 'react-router';

import Home from './Home';
// We should probably check prop types
// const propTypes = {
//
// };

class Router extends Component {
  constructor(props) {
    super(props);

    this.state = {
      home: Home,
    }
  }

  renderRoutes() {
    let { routes } = this.props;
    let routeKeys = Object.keys(routes);

    return routeKeys.map((routeName, idx) => {

      let route = routes[routeName];
      let Component = this.state[route.componentName];
      let exact = idx === 0 ? true : false;

      return(
        <Route
          exact={ exact }
          key={idx}
          path={ route.path }
          render={(props) => {
            return <Component title={route.name} {...props} />;
          }} />
      );
    })
  }

  render() {
    return (
      <div className='body-wrapper'>

        { this.props.routes ?
          this.renderRoutes() :
          'Loading...' }

      </div>
    );
  }
}

// Router.propTypes = propTypes;

export default Router;
