import React, { Component, useContext, useState, useEffect} from 'react';
import './myProfile.css'
import Axios from 'axios';
import  {withRouter } from 'react-router-dom';
import logo from '../../images/logo.png';
import { useHistory } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { UserContext } from '../Context/UserContext';
import validator from 'validator'

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
    if (auth==false) {
      history.push('/');}
    }); 

  const history = useHistory();
  const [auth, setAuth] = useContext(AuthContext);

  const {user, setUser} = useContext(UserContext);

  const [showEdit, setShowEdit] = useState(false);
  const [showFileSubmit, setShowFileSubmit] = useState(false);

  const [emailInputStatus, setEmailInputStatus] = useState("");
  const [nameInputStatus, setNameInputStatus] = useState("");
  const [password1InputStatus, setPassword1InputStatus] = useState("");
  const [password2InputStatus, setPassword2InputStatus] = useState("");
  const [phonenrInputStatus, setPhonenrInputStatus] = useState("");

  const [fileUpload, setFileUpload] = useState("");

  //Values to update/change
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phoneNr, setPhoneNr] = useState(user.phoneNr);
  const [bachelorDegree, setBachelorDegree] = useState(user.bachelorDegree);
  const [masterDegree, setMasterDegree] = useState(user.masterDegree);
          
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

  const handleNewEditClick = () => {
    setShowEdit(true) //hides component if shown, reveals if not shown
    setName(user.name);
    setEmail(user.email);
    setPhoneNr(user.phoneNr);
    setBachelorDegree(user.bachelorDegree);
    setMasterDegree(user.masterDegree);
   }

  const handleFileSubmitStatus = (e) => {
    setShowFileSubmit(true);
    setFileUpload(e.target.files[0]);
    console.log(fileUpload);
  }

   const handleBachelorChange = (e)  => {
    setBachelorDegree(e.target.value);
  }
  const handleMasterChange = (e)  => {
    setMasterDegree(e.target.value);
  }

   const cancel = () => {
    setEmailInputStatus("");  //Resetting the input-statuses so we can set them again on-press
    setNameInputStatus("");
    setPassword1InputStatus("");
    setPassword2InputStatus("");
    setPhonenrInputStatus("");
    setShowEdit(false); //If cancelled, we return to profile container
    setShowFileSubmit(false); //If cancelled, we return fileSubmission status to default
   }

   
  const checkEmail = (email) => {
    if (email != "" && validator.isEmail(email)) {
      return true;
    }
    else {
      return false;
    }
  }

   const update = () => {

    setEmailInputStatus("");  //Resetting the input-statuses so we can set them again on-press
    setNameInputStatus("");
    setPassword1InputStatus("");
    setPassword2InputStatus("");
    setPhonenrInputStatus("");

    let inputStatusOk = true;

    if (name == "") {
     setNameInputStatus("Name required!");
       inputStatusOk = false;
    }
   else if (name.length < 3) {
      setNameInputStatus("Name must be at least 3 characters!");
      inputStatusOk = false;
    }

    if (phoneNr.length < 8) {
      setPhonenrInputStatus("Vald phone number required!");
      inputStatusOk = false;
     }

    if (checkEmail(email) == false) {
      setEmailInputStatus("Vald email required!");
      inputStatusOk = false;
    }

    if (inputStatusOk) {   //If input status is true I.E no input errors - We send post request!

    Axios.patch("http://localhost:3001/updateMyProfile", {name: name, email: email, phoneNr: phoneNr, 
    bachelorDegree: bachelorDegree, masterDegree: masterDegree}, 
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
   }};

   const cvUpload =() => {

    const formData = new FormData();

		formData.append('file', fileUpload);

    Axios.post("http://localhost:3001/uploadCV", formData
    ).then(
      (response) => {
        alert(response.data.message);  //Sending message from server to user
   })
   };
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
	<label className='labelValue'>{user.bachelorDegree}</label> 
	<label className='label'>Master's degree:</label>
	<label className='labelValue'>{user.masterDegree}</label> 
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
    <p className="errorMsg">{nameInputStatus}</p>

  <label className='editLabel'>Email:</label>
	<input 
  className="editInput"
  type="text" 
  autoFocus 
  value={email}
  onChange={(event) => {
    setEmail(event.target.value)
    }}/>
   <p className="errorMsg">{emailInputStatus}</p>

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
   <p className="errorMsg">{phonenrInputStatus}</p>

	</div>

  <div className="rightContainer">
  <label className='editLabel'>Bachelor's degree:</label>
  <select name="bachelorDegrees" defaultValue={bachelorDegree} onChange={handleBachelorChange}>
    <option value="--None--">--None--</option>
    <option value="Law">Law</option>
    <option value="Mathematics">Mathematics</option>
    <option value="Medicin">Medicin</option>
    <option value="Business Administration">Business Administration</option>
    <option value="Biology">Biology</option>
    <option value="Finance/Accounting">Finance/Accounting</option>
    <option value="Economics">Economics</option>
  </select>
  
  <label className='editLabel'>Master's degree:</label>
  <select name="masterDegrees" defaultValue={masterDegree} onChange={handleMasterChange}>
    <option value="--None--">--None--</option>
    <option value="Law">Law</option>
    <option value="Mathematics">Mathematics</option>
    <option value="Medicin">Medicin</option>
    <option value="Business Administration">Business Administration</option>
    <option value="Biology">Biology</option>
    <option value="Finance/Accounting">Finance/Accounting</option>
    <option value="Economics">Economics</option>
  </select>

  <label className='label'>CV:</label>
    <input type="file" onChange={(e) => {handleFileSubmitStatus(e)}} 
    style={ showFileSubmit ? { textDecoration:'underline', color: 'darkblue', fontSize: 14} : {}} />
        <br/>
        <br/>
        { showFileSubmit &&
    <button onClick={cvUpload}>Upload CV</button>
        }
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