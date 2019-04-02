import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/login.jsx';
import AuthenticatedRoute from './components/AuthenticatedRoute.jsx';
import Dashboard from './components/dashboard.jsx';

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />

            <AuthenticatedRoute path="/dashboard/:name" component={Dashboard} />

          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
