import React from 'react';

import 'babel-polyfill';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import store from './store';
import VestydApp from './VestydApp';
import DashBoard from './pages/DashBoard';

const App = props =>
  <Provider store={store}>
    <Router>
      <VestydApp dispatch={store.dispatch} getState={store.getState}>
        <Switch>
          <Route path='/dashboard' exact component={DashBoard}/>
        </Switch>
      </VestydApp>
    </Router>
  </Provider>


export default App;
