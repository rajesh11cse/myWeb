import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import './css/App.css';
import Header from './Header';
import FooterWrapper from './Footer';
// import Home from './Home';
import TextEditorCon from './containers/TextEditorCon';
import Users from './Users';

export default function App() {
  return (
  <div className="App">
      <Router>
        <Header/>
        <div id="main-container">
          <Switch>
            {/* <Route exact path="/" component={Home} /> */}
            <Route exact path="/" component={TextEditorCon} />
            <Route path="/users" component={Users} />
          </Switch>
        </div>
        <FooterWrapper/>
      </Router>
  </div>
  );
}