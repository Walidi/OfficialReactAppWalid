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
import { UserContext } from './components/Context/UserContext';

function App () {           //Exact path = Beginning page of the site

  const [authStatus, setAuthStatus] = useState(AuthContext);
  const [currentUser, setCurrentUser] = useState(UserContext);
  
  useEffect(() => { //Stay logged in, if user is logged in, after refresh

    const token = localStorage.getItem('token');

    Axios.post("http://localhost:3001/authenticate", {  //End-point for creation request
    token: token, 
    },{withCredentials: true}).then(response => {
      if (!response.data.auth) { //checking for response message
        setAuthStatus(false); //Login status is 
        setCurrentUser(null);
        localStorage.clear();
        console.log("NOT LOGGED IN!");
       } else {
        setAuthStatus(true);  
        setCurrentUser(JSON.stringify(response.data.user))
        console.log("LOGGED IN!");
       }
    })
  }
  ,[]);

  return (
  <AuthContext.Provider value={[authStatus, setAuthStatus]}>
  <UserContext.Provider value ={[currentUser, setCurrentUser]}>
    <Router>
    <Switch>
      <Route exact={true} path="/" component={Login} />
      <Route path="/Registration" component={Registration} />
      <Route path ="/Confirmation" component={RegistrationConfirmed}/>
      <ProtectedRoute path="/home" component ={Home} authStatus = {authStatus}/>
      <ProtectedRoute path = "/myProfile" component={myProfile} authStatus = {authStatus}/>
      </Switch>
   </Router>
  </UserContext.Provider>
  </AuthContext.Provider>
  );
  };
render(<App />, document.getElementById('root'));