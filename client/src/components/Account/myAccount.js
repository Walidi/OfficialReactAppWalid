import React, { Component, useEffect} from 'react';
import Axios from 'axios';
import './myAccount.css'
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

class myAccount extends Component {

    state = {
        users: [],
        isLoaded: false,
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
        <NavLink to='/services' activeStyle>
          Services (NOT READY)
        </NavLink>
        <NavLink to='/contact-us' activeStyle>
          Contact Us (NOT READY)
        </NavLink>
        <NavLink to='/myAccount' activeStyle>
          My account
        </NavLink>
      </NavMenu>
      <NavBtn>
        <NavBtnLink to ="/" onClick={this.handleLogOut}>Log out</NavBtnLink>
      </NavBtn>
      </Nav>
      </div>
      <div>
      <section className="Home">
          <p>WTF MAN</p>
    <div className="Container">
    <p>{localStorage.getItem("userID")}</p>
    <p>THIS IS YOUR ACCOUNT!</p>
    </div>
    </section>
    </div>    
    </>
    );
  }
};

export default withRouter(myAccount);