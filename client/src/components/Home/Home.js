import React, { Component } from 'react';
import Axios from 'axios';
import './Home.css'

class Home extends Component {

    state = {
        users: [],
        isLoaded: false
    }
    
    logout =() => {
           //Something here where we end the session!
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

    <section className="Home">
        
    <div className="Container">
    <p>{localStorage.getItem("userID")}</p>
    <div className="buttonContainer">
       <button onClick = {this.getUsers}>Get users!</button>

      <div>
      {this.state.users.map(user => <div>{[user.id, user.name, user.phonenr]}</div>)}    
      </div>

    </div>
    </div>

    </section>
    );
  }
};

export default Home;