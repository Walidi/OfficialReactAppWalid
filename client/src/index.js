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
   
  const user = useState(UserContext);

  const [id, setId] = useState(user.id);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [cvFile, setCvFile] = useState(user.cvFile);
  const [bachelorDegree, setBachelorDegree] = useState(user.bachelorDegree);
  const [masterDegree, setMasterDegree] = useState(user.masterDegree);
  const [phoneNr, setPhoneNr] = useState(user.phoneNr);
 
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
        setId(JSON.stringify(response.data.user[0].id));
        setName(JSON.stringify(response.data.user[0].name));
        setEmail(JSON.stringify(response.data.user[0].email));
        setCvFile(JSON.stringify(response.data.user[0].cvFile));
        setBachelorDegree(JSON.stringify(response.data.user[0].bachelorDegree));
        setMasterDegree(JSON.stringify(response.data.user[0].masterDegree));
        setPhoneNr(JSON.stringify(response.data.user[0].phoneNr));
        
       }
    })
  }
  ,[]);

  return (
  <AuthContext.Provider value={[authStatus, setAuthStatus]}>
    <UserProvider>
    <Router>
    <Switch>
      <Route exact={true} path="/" component={Login} />
      <Route path="/Registration" component={Registration} />
      <Route path ="/Confirmation" component={RegistrationConfirmed}/>
      <ProtectedRoute path="/home" component ={Home} authStatus = {authStatus}/>
      <ProtectedRoute path = "/myProfile" component={myProfile} authStatus = {authStatus}/>
    </Switch>
    </Router>
    </UserProvider>
  </AuthContext.Provider>
  );
  };
render(
<App />, document.getElementById('root') 

);