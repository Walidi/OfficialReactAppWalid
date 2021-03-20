import React, { useState } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import RegistrationConfirmed from './components/Confirmation/RegistrationConfirmed'
import Home from './components/Home/Home';
import ProtectedRoute from './ProtectedRoute';
import { AuthContext } from './components/Context/AuthContext';

function App () {           //Exact path = Beginning page of the site

const [isAuth, setIsAuth] = useState(false);  //The boolean state determines the access for the protected routes/pages

  return (
    <AuthContext.Provider value={[isAuth, setIsAuth]}>
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/Registration" component={Registration} />
      <Route path ="/Confirmation" component={RegistrationConfirmed}/>
      <ProtectedRoute path="/home" component ={Home} isAuth={isAuth}/>
      </Switch>
  </Router>
  )
  </AuthContext.Provider>
  )
  };
render(<App />, document.getElementById('root'));
