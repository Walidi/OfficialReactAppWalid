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

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phoneNr, setPhoneNr] = useState(user.phoneNr);

  const [showEdit, setShowEdit] = useState(false);

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

  const handleNewEditClick = () => {
    setShowEdit(true) //hides component if shown, reveals if not shown
   }

   const cancel = () => {

   }

   const update = () => {

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
  { !showEdit && 
  <div>
	<div className="profileContainer">
   
	<div className="leftContainer">
	<label className='label'>Full name:</label>
	<label className='labelValue'>{user.name}</label> 
	<label className='label'>Email:</label>
	<label className='labelValue'>{user.email}</label> 
	<label className='label'>Phone number:</label>
	<label className='labelValue'>+45 {user.phoneNr}</label> 
	</div>

	<div className="rightContainer">
	<label className='label'>Bachelor's degree:</label>
	<label className='labelValue'>{bachelor}</label> 
	<label className='label'>Master's degree:</label>
	<label className='labelValue'>{master}</label> 
	</div> 
	</div>

	<div className="editButtonContainer">
	<button className='buttonEdit' onClick={handleNewEditClick}> Edit </button>
	</div>  
  </div>
  }
  
  { showEdit &&              //Write design for editing here:
  <div className="editContainer">
  <div className="leftContainer">
	<label className='editLabel'>Full name:</label>
	<input 
  className="editInput"
  type="text" 
  autoFocus 
  value={name}
  onChange={(event) => {
    setName(event.target.value)
    }}/>

  <label className='editLabel'>Email:</label>
	<input 
  className="editInput"
  type="text" 
  autoFocus 
  value={email}
  onChange={(event) => {
    setEmail(event.target.value)
    }}/>

  <label className='editLabel'>Phone number:</label>
	<input
  className="editInput" 
  type="number" 
  autoFocus 
  value={phoneNr}
  onChange={(event) => {
    setPhoneNr(event.target.value)
    }}/>
	</div>

  <div className="rightContainer">
  <label className='editLabel'>Bachelor's degree:</label>
  <select name="bachelorDegrees" id="bDegree-select">
    <option value="">--None--</option>
    <option value="Law">Law</option>
    <option value="Mathematics">Mathematics</option>
    <option value="Medicin">Medicin</option>
    <option value="Business Administration">Business Administration</option>
    <option value="Biology">Biology</option>
    <option value="Economics">Economics</option>
  </select>
  
  <label className='editLabel'>Master's degree:</label>
  <select name="masterDegrees" id="mDegree-select">
    <option value="">--None--</option>
    <option value="Law">Law</option>
    <option value="Mathematics">Mathematics</option>
    <option value="Medicin">Medicin</option>
    <option value="Business Administration">Business Administration</option>
    <option value="Biology">Biology</option>
    <option value="Economics">Economics</option>
  </select>
  </div>

  <div className="editButtonContainer">
	<button className='buttonUpdate' onClick={update}> Save changes </button>
	<button className='buttonCancel' onClick={cancel}> Cancel </button>
	</div> 
    </div>
}
      </>
    );
};

export default withRouter(myProfile);