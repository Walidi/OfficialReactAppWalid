import React, { Component, useContext, useState, useEffect} from 'react';
import './myProfile.css'
import  {withRouter } from 'react-router-dom';
import logo from '../../images/logo.png';
import { useHistory } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { UserContext } from '../Context/UserContext';

import {
  Nav,
  NavLink,
  Bars,
  NavMenu, 
  NavBtn,
  NavBtnLink
} from '../NavBar/NavbarElements';

function myProfile () {

  useEffect(() => { //Ensuring we cannot go back to Profile page when logged out! Already done with protected routing, but double security :D
    console.log(auth);
    console.log("Current User is: " + user.name);
	bachelorCheck(); //If bachelor's degree isnt set, we write "not set yes"
	masterCheck();   //If master's degree isnt set, we write "not set yes"
    if (auth==false) {
      history.push('/');}
    }); 

  const history = useHistory();
  const [auth, setAuth] = useContext(AuthContext);

  const {user} = useContext(UserContext);

  const [emailReg, setEmailReg] = useState("");
  const [nameReg, setNameReg] = useState("");
  const [passwordReg1, setPasswordReg1] = useState("");
  const [passwordReg2, setPasswordReg2] = useState("");
  const [phonenrReg, setPhonenrReg] = useState("");
  const [emailInputStatus, setEmailInputStatus] = useState("");
  const [nameInputStatus, setNameInputStatus] = useState("");
  const [password1InputStatus, setPassword1InputStatus] = useState("");
  const [password2InputStatus, setPassword2InputStatus] = useState("");
  const [phonenrInputStatus, setPhonenrInputStatus] = useState("");

  const [bachelor, setBachelor] = useState();
  const [master, setMaster] = useState();
          
  const handleLogOut =() => {
        setAuth(false);
        localStorage.clear();
        sessionStorage.clear();
        history.push('/');
      }

  const maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
         object.target.value = object.target.value.slice(0, object.target.maxLength)
          }
        }

  const bachelorCheck = () => {

	  if (user.bachelor == null) {
		  setBachelor("Bachelor's degree not set");
	  }
	  else 
	  	  setBachelor(user.bachelorDegree);
	 		
  }

  const masterCheck = () => {

	if (user.master == null) {
		  setMaster("Master's degree not set");
	}
	else 
		  setMaster(user.masterDegree)
  }

    return (
      <>
      <div>
      <Nav>
      <NavLink to='/home'>
        <img style={{flex:1, height: 60, width: 60}}
        src={logo}/>
      </NavLink>
      <Bars />
      <NavMenu>
        <NavLink to='candidates' activeStyle>
          Candidates 
        </NavLink>
        <NavLink to='/myProfile' activeStyle>
          My Profile
        </NavLink>
      </NavMenu>
      <NavBtn>
        <NavBtnLink to ="/" onClick={handleLogOut}>Log out</NavBtnLink>
      </NavBtn>
      </Nav>
      </div>

	<div className ="titleContainer">
	<h1>View and edit your information!</h1>
	</div>

	<div className="profileContainer">

	<div className="leftContainer">
	<label className='label'>Full name:</label>
	<label className='labelValue'>{user.name}</label> 
	<label className='label'>Email:</label>
	<label className='labelValue'>{user.email}</label> 
	<label className='label'>Phone number:</label>
	<label className='labelValue'>{user.phoneNr}</label> 
	</div>

	<div className="rightContainer">
	<label className='label'>Bachelor's Degree:</label>
	<label className='labelValue'>{bachelor}</label> 
	<label className='label'>Master's Degree:</label>
	<label className='labelValue'>{master}</label> 
	</div>

	<div className="editButtonContainer">
	<button> Edit </button>
	</div>
	</div>  
      </>
    );
};

export default withRouter(myProfile);