import React from 'react';

import 'babel-polyfill';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import store from './store';
import VestydApp from './VestydApp';
import GraffitiPage from './pages/GraffitiPage';
import HomePage from './pages/HomePage';

const App = props =>
  <Provider store={store}>
    <Router>
      <VestydApp dispatch={store.dispatch} getState={store.getState}>
        <Switch>
          <Route path='/' exact component={HomePage}/>
          <Route path='/graffiti' exact component={GraffitiPage}/>
        </Switch>
      </VestydApp>
    </Router>
  </Provider>


export default App;
