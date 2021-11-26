import React, { Component, useContext, useEffect} from 'react';
import Axios from 'axios';
import './myProfile.css'
import  {withRouter } from 'react-router-dom';
import logo from '../../images/logo.png';
import { useHistory } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
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
    if (auth==false) {
      history.push('/');}
    }); 

  const history = useHistory();
  const [auth, setAuth] = useContext(AuthContext);
      
  const handleLogOut =() => {
        setAuth(false);
        localStorage.clear();
        sessionStorage.clear();
        history.push('/');
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

      <div class="container">
      <h1 class="header">My Profile</h1>
        <img class="ui small centered circular image" src=""/>
        <label class ="label">Name</label>
              <input class="field" type="text" name="name" value=""/>
        <label class ="label">Email</label>
              <input class="field" type="text" name="email" value=""/>
         <label class ="label">Location</label>
              <input class="field" type="text" name="location" value=""/>
          <label class ="label">Bio</label>
              <textarea name="bio" rows="4" cols="40"></textarea>
            <button class="ui right floated  orange button" type="submit">Update</button>
      </div>
    </>
    );
};

export default withRouter(myProfile);