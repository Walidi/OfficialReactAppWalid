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
import { UserContext, UserProvider} from './components/Context/UserContext';

function App () {           //Exact path = Beginning page of the site

  const [authStatus, setAuthStatus] = useState(AuthContext);
   
  //const {id, name, email, cvFile, bachelorDegree, masterDegree, phoneNr} = useContext(UserContext);
  const id = useState(UserContext);
  const name = useState(UserContext);
  const email = useState(UserContext);
  const cvFile = useState(UserContext);
  const bachelorDegree = useState(UserContext);
  const masterDegree = useState(UserContext);
  const phoneNr = useState(UserContext);
  
  const [idValue, setIdValue] = id;
  const [nameValue, setNameValue] = name;
  const [emailValue, setEmailValue] = email;
  const [cvFileValue, setCvFileValue] = cvFile;
  const [bachelorDegreeValue, setBachelorDegreeValue] = bachelorDegree;
  const [masterDegreeValue, setMasterDegreeValue] = masterDegree;
  const [phoneNrValue, setPhoneNrValue] = phoneNr;

  
  useEffect(() => { //Stay logged in, if user is logged in, after refresh

    const token = localStorage.getItem('token');

    Axios.post("http://localhost:3001/authenticate", {  //End-point for creation request
    token: token, 
    },{withCredentials: true}).then(response => {
      if (!response.data.auth) { //checking for response message
        setAuthStatus(false); //Login status is 
       // setCurrentUser(null);
        localStorage.clear();
        console.log("NOT LOGGED IN!");
       } else {
        setAuthStatus(true);  
        console.log("LOGGED IN!");
        setIdValue(JSON.stringify(response.data.user[0].id));
        setNameValue(JSON.stringify(response.data.user[0].name));
        setEmailValue(JSON.stringify(response.data.user[0].email));
        setCvFileValue(JSON.stringify(response.data.user[0].cvFile));
        setBachelorDegreeValue(JSON.stringify(response.data.user[0].bachelorDegree));
        setMasterDegreeValue(JSON.stringify(response.data.user[0].masterDegree));
        setPhoneNrValue(JSON.stringify(response.data.user[0].phoneNr));
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
render(<App />, document.getElementById('root'));