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
import {UserContext, UserProvider} from './components/Context/UserContext';

function App () {           //Exact path = Beginning page of the site

  const [authStatus, setAuthStatus] = useState(AuthContext);
   
  const {setUser} = useContext(UserContext);
 
  useEffect(() => { //Stay logged in, if user is logged in, after refresh

    const token = localStorage.getItem('token');

    Axios.post("http://localhost:3001/authenticate", {  //End-point for creation request
    token: token, 
    },{withCredentials: true}).then(response => {
      if (!response.data.auth) { //checking for response message
        setAuthStatus(false); //Login status is 
        localStorage.clear();
        console.log("NOT LOGGED IN!");
       } else {
        setAuthStatus(true);  
        console.log("LOGGED IN!");
        setUser({id: JSON.stringify(response.data.user[0].id), name: JSON.stringify(response.data.user[0].name),
          email: JSON.stringify(response.data.user[0].email), cvFile: JSON.stringify(response.data.user[0].cvFile), 
          bachelorDegree: JSON.stringify(response.data.user[0].bachelorDegree), masterDegree: JSON.stringify(response.data.user[0].masterDegree),
          phoneNr: JSON.stringify(response.data.user[0].phoneNr)});
       }
    })
  }
  ,[]);

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
  const rootElement = document.getElementById('root');
  render(
    // wrap root element with context
    <UserProvider>
      <App />
    </UserProvider>,
    rootElement
  );