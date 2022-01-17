import React,{useContext, useEffect, useState}  from 'react';
import Axios from 'axios';
import './Login.css';
import  { useHistory } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import logo from '../../images/logo.png';
import { UserContext } from '../Context/UserContext';

function Login () {
 
  const [emailAuth, setEmailAuth] = useState("");
  const [passwordAuth, setPasswordAuth] = useState("");

  const [loginStatus, setLoginStatus] = useContext(AuthContext);
  
  const {id, name, email, cvFile, bachelorDegree, masterDegree, phoneNr} = useContext(UserContext);
  const [idValue, setIdValue] = id;
  const [nameValue, setNameValue] = name;
  const [emailValue, setEmailValue] = email;
  const [cvFileValue, setCvFileValue] = cvFile;
  const [bachelorDegreeValue, setBachelorDegreeValue] = bachelorDegree;
  const [masterDegreeValue, setMasterDegreeValue] = masterDegree;
  const [phoneNrValue, setPhoneNrValue] = phoneNr;

  const [inputResponse, setInputResponse] = useState("");
  const history = useHistory();

  useEffect(() => {   //Ensuring we cannot go back to login page when authenticated!
    if (loginStatus==true) {
      history.push('/home');}
    }); 

  const goToHomeScreen=() => {
    history.push('/home');
  }
  
  Axios.defaults.withCredentials = true; 

  const handleLogin = () => {
    
    
    if (emailAuth == "" || passwordAuth == "") {   //Dummy check
      setInputResponse("Fields required!");
      setLoginStatus(false);
     }
   else
    Axios.post('http://localhost:3001/login', {
      email: emailAuth,
      password: passwordAuth
    }).then((response)=> {
      if (!response.data.auth) { //checking for response message
       setInputResponse(response.data.message);    
       setLoginStatus(false);
      } 
      else {    //SUCCESS! 
       
           {loginStatus && goToHomeScreen()}; 
           localStorage.setItem("token", response.data.token); //Json web token is set to user's local storage
           setLoginStatus(true); //Maybe consider setting it as (response.data.auth) instead of client-dependant: 'true'
           setIdValue(JSON.stringify(response.data.user[0].id));
           setNameValue(JSON.stringify(response.data.user[0].name));
           setEmailValue(JSON.stringify(response.data.user[0].email));
           setCvFileValue(JSON.stringify(response.data.user[0].cvFile));
           setBachelorDegreeValue(JSON.stringify(response.data.user[0].bachelorDegree));
           setMasterDegreeValue(JSON.stringify(response.data.user[0].masterDegree));
           setPhoneNrValue(JSON.stringify(response.data.user[0].phoneNr));
      }
    });
  };

   const goToRegistration = () => {
    history.push('/registration');
    }
    
  return (
    <section className="Login">
    <div>
    <img style={{flex:1, height: 80, width: 90, marginTop: 10}}
    src={logo}/>
    </div>
        
    <div className="loginContainer">

        <div className ="title">
        <h1>Welcome to Walido.com</h1>
        </div>

        <label>Email</label>
        <input 
        type="text" 
        required
        autoFocus
        onChange={(event) => {
          setEmailAuth(event.target.value);
        }}
        />
        <label>Password</label>
        <input 
        type="password"
        required
        autoFocus
        onChange={(event) => {
          setPasswordAuth(event.target.value);
        }}
        />
        <p className="errorMsg">{inputResponse}</p>
        <div className="buttonContainer">
        <button onClick={handleLogin}> Login </button>
        <p>
            Don't have an account?
            <span onClick={goToRegistration}>Register here!</span>
        </p>
        </div>
      </div>
    </section>
  );
 }
 export default Login;