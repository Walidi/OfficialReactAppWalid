import React,{useContext, useEffect, useState}  from 'react';
import Axios from 'axios';
import './Login.css';
import  { useHistory } from 'react-router-dom';
import {AuthContext} from '../Context/AuthContext'

function Login () {
 
  const [usernameAuth, setUsernameAuth] = useState("");
  const [passwordAuth, setPasswordAuth] = useState("");
  const [loginStatus, setLoginStatus] = useContext(AuthContext);
 // const {isAuth} = useAuthRoute();
  const [inputResponse, setInputResponse] = useState("");

  const history = useHistory();

  const goToHomeScreen=() => {
    history.push('/home');
  }

  
  Axios.defaults.withCredentials = true; 

  const handleLogin = () => {
    
    if (usernameAuth == "" || passwordAuth == "") {   //Dummy check
      //alert("Fields required!");
      setInputResponse("Fields required!");
     }
   else
    Axios.post('http://localhost:3001/login', {
      username: usernameAuth,
      password: passwordAuth
    }).then((response)=> {
      if (!response.data.auth) { //checking for response message
       setLoginStatus(false); //Login status is set
       setInputResponse(response.data.message);
      } else {
           setLoginStatus(true); 
           localStorage.setItem("token", response.data.token); //Json web token is set to users local storage
           {loginStatus && (goToHomeScreen())}
      }
    });
  };

  useEffect(() => { //Stay logged in, if user is logged in, after refresh
     Axios.get("http://localhost:3001/login").then((response) => { //Get logged-in-data after refesh
      if (response.data.loggedIn == true)  {
     setLoginStatus(response.data.user[0].username); //Always sending current user name despite refesh
      }
    }) 
  }, [])

   const goToRegistration = () => {
    history.push('/registration');
    }
    
  return (
    <section className="Login">
        
    <div className="loginContainer">

        <div className ="title">
        <h1>Welcome to Walido.com</h1>
        </div>

        <label>Username</label>
        <input 
        type="text" 
        required
        autoFocus
        onChange={(event) => {
          setUsernameAuth(event.target.value);
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


