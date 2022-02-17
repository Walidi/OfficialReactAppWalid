import React, { Component, useContext, useState, useEffect} from 'react';
import './myProfile.css'
import Axios from 'axios';
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

  const {user, setUser} = useContext(UserContext);

  const [showEdit, setShowEdit] = useState(false);

  const [bachelor, setBachelor] = useState(user.bachelorDegree);
  const [master, setMaster] = useState(user.masterDegree);

  //Values to update/change
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phoneNr, setPhoneNr] = useState(user.phoneNr);

  const [newBachelor, setNewBachelor] = useState(user.bachelorDegree);
  const [newMaster, setNewMaster] = useState(user.masterDegree);
          
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

	  if (user.bachelorDegree == null || user.bachelorDegree == "null" || user.bachelorDegree == "NULL") {
		  setBachelor("Not set");
	  }
	  else 
	  	setBachelor(user.bachelorDegree);
  }

  const masterCheck = () => {

	if (user.masterDegree == null || user.masterDegree == "null" || user.masterDegree == "NULL") {
		  setMaster("Not set");
	}
	else 
		  setMaster(user.masterDegree)
  }

  const handleNewEditClick = () => {
    setShowEdit(true) //hides component if shown, reveals if not shown
    setName(user.name);
    setEmail(user.email);
    setPhoneNr(user.phoneNr);
    setBachelor(user.bachelorDegree);
    setMaster(user.masterDegree);
   }

   const handleBachelorChange = (e)  => {
    setNewBachelor(e.target.value);
  }
  const handleMasterChange = (e)  => {
    setNewMaster(e.target.value);
  }

   const cancel = () => {
     setShowEdit(false); //If cancelled, we return to profile container
   }

   const update = () => {

    Axios.patch("http://localhost:3001/updateMyProfile", {name: name, email: email, phoneNr: phoneNr, 
    bachelorDegree: newBachelor, masterDegree: newMaster}, 
    {headers: {"x-access-token": localStorage.getItem("token")},withCredentials: true}
    ).then(
      (response) => {
        //Making sure our currentUser Context in client attains the newly updated data when screens chance
        var id = JSON.stringify(response.data.user[0].id).replace(/^"(.+(?="$))"$/, '$1');
        var name = JSON.stringify(response.data.user[0].name).replace(/^"(.+(?="$))"$/, '$1');
        var email = JSON.stringify(response.data.user[0].email).replace(/^"(.+(?="$))"$/, '$1');
        var cvFile = JSON.stringify(response.data.user[0].cvFile);
        var bachelorDegree = JSON.stringify(response.data.user[0].bachelorDegree).replace(/^"(.+(?="$))"$/, '$1');
        var masterDegree = JSON.stringify(response.data.user[0].masterDegree).replace(/^"(.+(?="$))"$/, '$1');
        var phoneNr = JSON.stringify(response.data.user[0].phoneNr).replace(/^"(.+(?="$))"$/, '$1');
        setUser({id: id, name: name, email: email, cvFile: cvFile, bachelorDegree: bachelorDegree, masterDegree: masterDegree, phoneNr: phoneNr});

       alert(response.data.message);  //Sending message from server to user
       setShowEdit(false);            //Returning to the normal profile view when user click 'ok'

      }
    );
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
  <div>
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
  className="editPhoneNr" 
  type="number" 
  autoFocus 
  maxLength = "8" 
  onInput={maxLengthCheck} 
  value={phoneNr}
  onChange={(event) => {
    setPhoneNr(event.target.value)
    }}/>
	</div>

  <div className="rightContainer">
  <label className='editLabel'>Bachelor's degree:</label>
  <select name="bachelorDegrees" defaultValue={bachelor} onChange={handleBachelorChange}>
    <option value="NULL">--None--</option>
    <option value="Law">Law</option>
    <option value="Mathematics">Mathematics</option>
    <option value="Medicin">Medicin</option>
    <option value="Business Administration">Business Administration</option>
    <option value="Biology">Biology</option>
    <option value="Finance/Accounting">Finance/Accounting</option>
    <option value="Economics">Economics</option>
  </select>
  
  <label className='editLabel'>Master's degree:</label>
  <select name="masterDegrees" defaultValue={master} onChange={handleMasterChange}>
    <option value="NULL">--None--</option>
    <option value="Law">Law</option>
    <option value="Mathematics">Mathematics</option>
    <option value="Medicin">Medicin</option>
    <option value="Business Administration">Business Administration</option>
    <option value="Biology">Biology</option>
    <option value="Finance/Accounting">Finance/Accounting</option>
    <option value="Economics">Economics</option>
  </select>
  </div>

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