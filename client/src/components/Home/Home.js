import React, { Component, useContext, useEffect, useState} from 'react';
import Axios from 'axios';
import './Home.css'
import  {withRouter } from 'react-router-dom';
import logo from '../../images/logo.png';
import { AuthContext } from '../Context/AuthContext';
import  { useHistory } from 'react-router-dom';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from '../NavBar/NavbarElements';
import { UserContext } from '../Context/UserContext';


function Home () {

    const [users, setUsers] = useState([]);
    const [auth, setAuth] = useContext(AuthContext);

    const {id, name, email, cvFile, bachelorDegree, masterDegree, phoneNr} = useContext(UserContext);
    const [nameValue] = name;
    
    const history = useHistory();

    useEffect(() => { //Ensuring we cannot go back to Home page when logged out! Already done with protected routing, but double security :D
      console.log(auth);
      console.log('Current user is:' + nameValue);
      if (auth==false) {
        history.push('/');}
      }); 

    const handleLogOut = () => {
      setAuth(false);
      //setCurrentUser(null);
      localStorage.clear();
      sessionStorage.clear();

      Axios.get("http://localhost:3001/logout", {

      }).then((response => {
      console.log(response);
      }
      ));
      history.push('/');
  }

    const getUsers = () => {
        Axios.get("http://localhost:3001/users", {
          
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        }).then((response) => {
            setUsers( response.data, 
            )
        }).catch(error => {
            console.log({
              error,  
              'error response': error.response
            })
            alert('Server error!')
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
      <section className="Home">
          <p>WTF MAN</p>
    <div className="Container">
    <p>{localStorage.getItem("userID")}</p>
    <div className="buttonContainer">
       <button onClick = {getUsers}>Get users!</button>
      <div>
      {users.map(user => <div>{[user.id, user.name, user.phonenr]}</div>)}    
      </div>
      <button onClick = {handleLogOut}>Log out</button>
    </div>
    </div>

    </section>
    </>
    );
  }

export default withRouter(Home);