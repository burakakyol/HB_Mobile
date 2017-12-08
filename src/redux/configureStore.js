// @flow

import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import { rootReducer as reducer } from './modules';

const middlewares = [thunk];

const composed = [applyMiddleware(...middlewares)];

const store = createStore(reducer, {}, compose(...composed));

export default store;
