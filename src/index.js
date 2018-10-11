import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import Root from './components/root/root';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import registerServiceWorker from './registerServiceWorker';

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
)

render(<Root store={store} />, document.getElementById('root'));
registerServiceWorker();
