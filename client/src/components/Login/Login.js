import React,{useEffect, useState}  from 'react';
import Axios from 'axios';
import './Login.css';
import  { useHistory } from 'react-router-dom';

function Login () {
 
  const [usernameAuth, setUsernameAuth] = useState("");
  const [passwordAuth, setPasswordAuth] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const history = useHistory();
  
  Axios.defaults.withCredentials = true; 
  const handleLogin = () => {
    
    if (usernameAuth == "" || passwordAuth == "") {   //Dummy check
      //alert("Fields required!");
      setLoginStatus("Fields required!");
     }
   else
    Axios.post('http://localhost:3001/login', {
      username: usernameAuth,
      password: passwordAuth
    }).then((response)=> {
      if (response.data.message) { //checking for response message
       setLoginStatus(response.data.message); //Login status is set
      } else {
           setLoginStatus(response.data[0].name); //Displaying username of the one logged in
      }
    });
  };

  useEffect(() => { //Stay logged in, if user is logged in, after refresh
     Axios.get("http://localhost:3001/login").then((response) => { //Get logged-in-data after refesh
      if (response.data.loggedIn == true)  {
     setLoginStatus(response.data.user[0].name); //Always sending current user name despite refesh
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
        <p className="errorMsg">{loginStatus}</p>
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


