import React, { Component, useContext, useEffect} from 'react';
import Axios from 'axios';
import './myProfile.css'
import  {withRouter } from 'react-router-dom';
import logo from '../../images/logo.png';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from '../NavBar/NavbarElements';
import { CurrentUser } from '../Context/CurrentUserContext';

class myProfile extends Component {

    state = {
        users: [],
        isLoaded: false
    }
      
    handleLogOut =() => {

        localStorage.clear();
        sessionStorage.clear();
        this.props.history.push('/');
      }

      getUsers = () => {
        Axios.get("http://localhost:3001/users", {
          
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        }).then((response) => {
            this.setState({
                users: response.data, 
                isLoaded: true
            })
        }).catch(error => {
            console.log({
              error,  
              'error response': error.response
            })
            alert('Server error!')
          }) 
        };


  render() {
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
        <NavBtnLink to ="/" onClick={this.handleLogOut}>Log out</NavBtnLink>
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
  }
};

export default withRouter(myProfile);