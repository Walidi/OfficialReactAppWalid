import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import RegistrationConfirmed from './components/Confirmation/RegistrationConfirmed'
import Home from './components/Home/Home';
import myAccount from './components/Account/myAccount';
import ProtectedRoute from './ProtectedRoute';

import { AuthContext } from './components/Context/AuthContext';
import Axios from 'axios';

function App () {           //Exact path = Beginning page of the site

  const [authStatus, setAuthStatus] = useState(AuthContext);

  const userAuthToken = localStorage.getItem('token'); 
  
  useEffect(() => { //Stay logged in, if user is logged in, after refresh
    Axios.post("http://localhost:3001/isUserAuth", {   //End-point for creation request
      token: userAuthToken
    }).then(response => {
      if (!response.data.auth) { //checking for response message
        setAuthStatus(false); //Login status is set
        console.log("NOT LOGGED IN!");
       } else {
        setAuthStatus(true);  
        console.log("LOGGED IN!");
       }
    })
  }, [])

  return (
    <AuthContext.Provider value={[authStatus, setAuthStatus]}>
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/Registration" component={Registration} />
      <Route path ="/Confirmation" component={RegistrationConfirmed}/>
    
      <ProtectedRoute path="/home" component ={Home} authStatus = {authStatus}/>
      <ProtectedRoute path = "/myAccount" component={myAccount} authStatus = {authStatus}/>
      </Switch>
  </Router>
    )
    </AuthContext.Provider>
  );
  };
render(<App />, document.getElementById('root'));