import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Window from './components/Window'; 

const store = createStore(
  combineReducers(reducers), 
  applyMiddleware(logger, thunk),
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Window />
      </Provider>      
    );
  }
}

export default App;
