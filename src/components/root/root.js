import React from 'react';
import Router from '../router/router';
import { Provider } from 'react-redux';

const Root = ({store}) => (
  <Provider store={store}>
    <Router />
  </Provider>
)

export default Root;
