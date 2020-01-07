import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import array from './array';
import rootSaga from '../sagas';

const saga = createSagaMiddleware();

const middlewares = [
  array,
  saga,
];

const store = createStore(
  combineReducers(reducers),
  compose(
    applyMiddleware(...middlewares),
  ),
);

saga.run(rootSaga);

export default store;