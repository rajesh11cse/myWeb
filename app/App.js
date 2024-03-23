import React, {useState, useEffect} from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import './css/App.css';
import Header from './Header';
import FooterWrapper from './Footer';
import Home from './containers/Home';
import Templates from './containers/Templates';
import Pricing from './containers/Pricing';
import Support from './containers/Support';
import TextEditorCon from './containers/TextEditorCon';
import Users from './Users';

export default function App() {
  const [hideFooter, setHideFooter] = useState(false);
  const handleNavClick = (loc) => {
    if (loc === '/editor') {
      setHideFooter(true);
    } else {
      setHideFooter(false);
    }
  };

  useEffect(() => {
    if (window.location && window.location.pathname && window.location.pathname.includes("/editor")){
      setHideFooter(true);
    }else{
      setHideFooter(false)
    }
  },[])
  return (
  <div className="App">
      <Router>
        <Header onNavClick={handleNavClick}/>
        <div id="main-container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/editor" component={TextEditorCon} />
            <Route exact path="/templates" component={Templates} />
            <Route exact path="/support" component={Support} />
            <Route exact path="/pricing" component={Pricing} />
            <Route path="/users" component={Users} />
          </Switch>
        </div>
       {!hideFooter && (
          <div id="footer-container">
            <FooterWrapper />
          </div>
        )}
      </Router>
  </div>
  );
}