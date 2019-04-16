import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import AuthenticatedRoute from './AuthenticatedRoute';
import Dashboard from './Dashboard';
import Logout from './Logout';
import PageNotFound from './PageNotFound';
import Header from './Header';
import Drivers from './Drivers';
import Driver from './Driver';
import Vehicle from './Vehicle';
import Vehicles from './Vehicles';

class VfmApp extends Component {
  render() {
    return (
      <div className="TodoApp">
        <Router>
          <>
            <Header />
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/login" component={Login} />
              <AuthenticatedRoute path="/logout" component={Logout} />
              <AuthenticatedRoute path="/dashboard/:name" component={Dashboard} />
              <AuthenticatedRoute path="/drivers/:id" component={Driver} />
              <AuthenticatedRoute path="/drivers" component={Drivers} />
              <AuthenticatedRoute path="/vehicles/:id" component={Vehicle} />
              <AuthenticatedRoute path="/vehicles" component={Vehicles} />
              


              <Route component={PageNotFound} />

            </Switch>
          </>
        </Router>
      </div>
    );
  }
}

export default VfmApp;
