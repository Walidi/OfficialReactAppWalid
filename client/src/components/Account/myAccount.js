import React, { Component, useEffect} from 'react';
import Axios from 'axios';
import './myAccount.css'
import  {withRouter } from 'react-router-dom';

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

    <section className="Account">
    <div className="Container">
    <p>{localStorage.getItem("userID")}</p>
    <p1>THIS IS YOUR ACCOUNT!</p1>
    </div>

    </section>
    );
  }
};

export default withRouter(myAccount);