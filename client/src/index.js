import React, { useState, useEffect, useContext } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import RegistrationConfirmed from './components/Confirmation/RegistrationConfirmed'
import Home from './components/Home/Home';
import myProfile from './components/Profile/myProfile';
import ProtectedRoute from './ProtectedRoute';
import { AuthContext } from './components/Context/AuthContext';
import Axios from 'axios';

function App () {           //Exact path = Beginning page of the site

  const [authStatus, setAuthStatus] = useState(AuthContext);
  
  useEffect(() => { //Stay logged in, if user is logged in, after refresh

    const token = localStorage.getItem('token');

    Axios.post("http://localhost:3001/authenticate", {  //End-point for creation request
    token: token, 
    },{withCredentials: true}).then(response => {
      if (!response.data.auth) { //checking for response message
        setAuthStatus(false); //Login status is set
        //localStorage.clear();
        console.log("NOT LOGGED IN!");
        console.log(response.data.user);
       } else {
        setAuthStatus(true);  
        console.log("LOGGED IN!");
        console.log(response.data.user);
       }
    })
  }
  ,[]);

  /*
  useEffect(() => { //Stay logged in, if user is logged in, after refresh
    Axios.get("http://localhost:3001/login", {
        }).then(response => {
        console.log('Current user session exists: ' + response.data.loggedIn);
    }).catch(error => {
        console.log({
          error,  
          'error response': error.response
        })
        alert('Server error!')
      })
    }
    ,[]);*/

  return (
    <AuthContext.Provider value={[authStatus, setAuthStatus]}>
  <Router>
    <Switch>
      <Route exact={true} path="/" component={Login} />
      <Route path="/Registration" component={Registration} />
      <Route path ="/Confirmation" component={RegistrationConfirmed}/>
      <ProtectedRoute path="/home" component ={Home} authStatus = {authStatus}/>
      <ProtectedRoute path = "/myProfile" component={myProfile} authStatus = {authStatus}/>
      </Switch>
  </Router>
    </AuthContext.Provider>
  );
  };
render(<App />, document.getElementById('root'));