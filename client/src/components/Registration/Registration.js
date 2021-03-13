import React, { Component } from 'react';
import Axios from 'axios';
import './Registration.css'

class Registration extends Component {

  state = {
    usernameReg: "",
    nameReg: "",
    passwordReg1: "",
    passWordReg2: "",
    phonenrReg: "",
  }

  componentDidMount() {                 //Resetting passwords after the checks so the states update fast thru this
    this.setState({passwordReg1: ""});
    this.setState({passwordReg2: ""});
  }

  maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
     object.target.value = object.target.value.slice(0, object.target.maxLength)
      }
    }

  goBackToLogin =() => {
    this.props.history.push('/');
  }

  handleRegistration = () => {

    if (this.state.phonenrReg.length < 8) {
      alert("Please enter valid phone number!");
    }

    else if (this.state.passwordReg1 != this.state.passWordReg2) {
      alert("Passwords do not match - Try again!");
    }

    else if (this.state.passwordReg1.length<5) {
      alert("Password must at least be 5 characters!")
    }

    else {
    Axios.post("http://localhost:3001/register", {   //End-point for creation request
      username: this.state.usernameReg,
      name: this.state.nameReg, 
      password: this.state.passwordReg1,
      phoneNr: this.state.phonenrReg

    }).then(response => {
      if (response.data.message) {    //If the response from server returns us the message of "user already exists" we alert here!
      alert('Username already exists - Try another!');
      }
      else {
      alert('Success!'); //Navigate to "Login" or "Confirmation page of the registration"
      }
    })
    .catch(error => {
      console.log({
        error,  
        'error response': error.response
      })
      alert('Something went wrong!')
    }) 
  }
  };

  render() {
    return (

    <section className="Registration">
        
    <div className="registrationContainer">
        <div className ="title">
        <h1>Register yourself here!</h1>
        </div>

        <label>Full name</label>
        <input 
        type="text" 
        required
        autoFocus
        onChange={(event) => {
          this.setState({nameReg: event.target.value});
        }}
        />
         <label>Phone number</label>
        <input 
        type="number"
        required
        autoFocus
        maxLength = "8" 
        onInput={this.maxLengthCheck} 
        onChange={(event) => {
          this.setState({phonenrReg: event.target.value});
        }}
        />
        <label>Username</label>
        <input 
        type="text" 
        required
        autoFocus
        onChange={(event) => {
          this.setState({usernameReg: event.target.value});
        }}
        />
        <label>Password</label>
        <input 
        type="password"
        required
        autoFocus
        onChange={(event) => {
          this.setState({passwordReg1: event.target.value});
        }}
        />
        <label>Repeat password</label>
        <input 
        type="password"
        required
        autoFocus
        onChange={(event) => {
          this.setState({passWordReg2: event.target.value});
        }}
        />
        <div className="buttonContainer">
        <button onClick={this.handleRegistration}> Register </button>
        <p>
            Already have an account?
            <span onClick={this.goBackToLogin}>Login here!</span>
        </p>
        </div>
      </div>
    </section>
    );
  }
};

export default Registration;