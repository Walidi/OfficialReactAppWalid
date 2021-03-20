import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import RegistrationConfirmed from './components/Confirmation/RegistrationConfirmed'
import Home from './components/Home/Home';

const App = () => (               //Exact path = Beginning page of the site
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/Registration" component={Registration} />
      <Route path ="/Confirmation" component={RegistrationConfirmed}/>
      <Route path ="/Home" component ={Home}/>
    </Switch>
  </Router>
);
render(<App />, document.getElementById('root'));