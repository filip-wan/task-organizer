import { Route, Switch } from 'react-router-dom';

import Home from '../Home';
import Login from './Login';
import React from 'react';
import Settings from './Settings';

const Routes = () => (
  <Switch>
    <Route path='/login'>
      <Login />
    </Route>
    <Route path='/settings'>
      <Settings />
    </Route>
    <Route path='/'>
      <Home />
    </Route>
  </Switch>
);

export default Routes;
