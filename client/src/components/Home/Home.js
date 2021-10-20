import React, { Component, useEffect} from 'react';
import Axios from 'axios';
import './Home.css'
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

class Home extends Component {

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
        <NavLink to='candidates' activeStyle>
          Candidates (NOT READY)
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
      <section className="Home">
          <p>WTF MAN</p>
    <div className="Container">
    <p>{localStorage.getItem("userID")}</p>
    <div className="buttonContainer">
       <button onClick = {this.getUsers}>Get users!</button>
      <div>
      {this.state.users.map(user => <div>{[user.id, user.name, user.phonenr]}</div>)}    
      </div>
      <button onClick = {this.handleLogOut}>Log out</button>
    </div>
    </div>

    </section>
  
    </>
    
    );
  }
};

export default withRouter(Home);