import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import NotFound from '../layout/NotFound';
import PrivateRoute from './PrivateRoute';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
