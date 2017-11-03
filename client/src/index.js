require('react-hot-loader/patch'); // I forgot why but dont remove! this will break HMR!

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import RootContainer from './containers/RootContainer'; // Where it all begins

import configureStore from './store/configureStore'; // Redux Store

// Style
import './style/style.scss';

const store = configureStore();

// Nice function to rerender with HMR
// Component === <RootContainer />
const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    document.getElementById('root')
  )
};

// Initial Render
render(RootContainer);

// HMR Rerenders...
if (module.hot) {
  module.hot.accept('./containers/RootContainer', () => {
    const newApp = require('./containers/RootContainer').default;
    render(newApp);
  });
}
