import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import './App.css';


import Header from './Header';
import FooterWrapper from './Footer';
import Home from './Home';
import Users from './Users';
import NotFound from './notfound';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <div id="main-container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/users" component={Users} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <FooterWrapper />
      </Router>
    </div>
  );
}

export default App;
