import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home';
import Login from './Login';

const Routes = () => (
  <Switch>
    <Route path='/login'>
      <Login />
    </Route>
    <Route path='/settings'>Settings</Route>
    <Route path='/'>
      <Home />
    </Route>
  </Switch>
);

export default Routes;
