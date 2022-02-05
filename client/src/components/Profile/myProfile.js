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

	<div className="profileContainer">

	<div className ="titleProfile">
	<h1>View and edit your information!</h1>
	</div>

	<div className="leftContainer">
	<label>Full name</label>
	<input 
	type="text" 
	value={user.name}
	autoFocus
	onChange={(event) => {
  	setNameReg(event.target.value);
		}}
	/>
	<p className="errorMsg">{nameInputStatus}</p>
	<label>Phone number</label>
	<input 
	type="number"
	value={user.phoneNr}
	autoFocus
	maxLength = "8" 
	onInput={maxLengthCheck} 
	onChange={(event) => {
  	setPhonenrReg(event.target.value);
		}}
	/>
	<p className="errorMsg">{phonenrInputStatus}</p>
	<label>Email</label>
	<input
	type="text" 
	value={user.email}
	autoFocus
	onChange={(event) => {
  	setEmailReg(event.target.value);
	}}
	/>
	<p className="errorMsg">{emailInputStatus}</p>
	</div>

	<div className="rightContainer">
	<label>Password</label>
	<input
	type="password"
	autoFocus
	onChange={(event) => {
  	setPasswordReg1(event.target.value);
		}}
	/>
	<p className="errorMsg">{password1InputStatus}</p>

	<label>Repeat password</label>
	<input 
	type="password"
	required
	autoFocus
	onChange={(event) => {
  	setPasswordReg2(event.target.value);
	}}
	/>
	<p className="errorMsg">{password2InputStatus}</p>
	</div>

	<div className="editButtonContainer">
	<button> Edit </button>
	</div>
	</div>  
      </>
    );
};

export default withRouter(myProfile);