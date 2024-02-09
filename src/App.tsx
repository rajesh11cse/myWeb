import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import './App.css';
// import Loadable from 'react-loadable';


// const Loading = () => null;
import Header from './Header';
import FooterWrapper from './Footer';
import Home from './Home';
// const TextEditorCon = Loadable({
//   loader: () => import('./containers/TextEditorCon'),
//   loading: Loading,
// });
import TextEditorCon from './containers/TextEditorCon';
import Users from './Users';
// import NotFound from './notfound';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <div id="main-container">
          <Switch>
            {/* <Route exact path="/" component={Home} /> */}
            <Route exact path="/" component={TextEditorCon} />
            <Route path="/users" component={Users} />
            {/* <Route component={NotFound} /> */}
          </Switch>
        </div>
        <FooterWrapper />
      </Router>
    </div>
  );
}

export default App;
