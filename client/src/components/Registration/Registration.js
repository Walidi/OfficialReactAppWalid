import React, { Component } from 'react';
import Axios from 'axios';
import './Registration.css'
import  { useHistory } from 'react-router-dom';

class Registration extends Component {

  state = {
    usernameReg: "",
    nameReg: "",
    passwordReg1: "",
    passWordReg2: "",
    phonenrReg: "",
    usernameInputStatus: "",
    nameInputStatus: "",
    password1InputStatus: "",
    password2InputStatus: "",
    phonenrInputStatus: ""
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

  goToConfirmationScreen=() => {
    this.props.history.push('/confirmation');
  }

  handleRegistration = () => {

    this.setState({usernameInputStatus: ""});         //Resetting the input-statuses so we can set them again on-press
    this.setState({nameInputStatus: ""});
    this.setState({password1InputStatus: ""});
    this.setState({password2InputStatus: ""});
    this.setState({phonenrInputStatus: ""});

    let inputStatusOk = true;

    if (this.state.nameReg == "") {
      this.setState({nameInputStatus: "Name required!"})
      inputStatusOk = false;
    }
   else if (this.state.nameReg.length < 3) {
      this.setState({nameInputStatus: "Name must be at least 3 characters!"})
      inputStatusOk = false;
    }

    if (this.state.phonenrReg.length < 8) {
      this.setState({phonenrInputStatus: "Valid phonenumber required!"});
      inputStatusOk = false;
     }

    if (this.state.usernameReg == "") {
      this.setState({usernameInputStatus: "Username required!"})
      inputStatusOk = false;
    }
     else if (this.state.usernameReg.length < 3) {
      this.setState({usernameInputStatus: "Username must be at least 3 characters!"})
      inputStatusOk = false;
    }
    
    if (this.state.passwordReg1 == "") {
      this.setState({password1InputStatus: "Password required!"})
      inputStatusOk = false;
    }

    else if (this.state.passwordReg1 != this.state.passWordReg2) {
      this.setState({password2InputStatus: "Passwords do not match!"})
      inputStatusOk = false;
    }

   else if (this.state.passwordReg1.length<5) {
      this.setState({password1InputStatus: "Password must at least be 5 characters!"})
      inputStatusOk = false;
    }

    if (inputStatusOk){   //If input status is true I.E no input errors - We send post request!

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
      //alert('Success!'); //Navigate to "Login" or "Confirmation page of the registration"
      this.goToConfirmationScreen();
      }
    })
    .catch(error => {
      console.log({
        error,  
        'error response': error.response
      })
      alert('Server error!')
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
        <p className="errorMsg">{this.state.nameInputStatus}</p>

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
        <p className="errorMsg">{this.state.phonenrInputStatus}</p>

        <label>Username</label>
        <input 
        type="text" 
        required
        autoFocus
        onChange={(event) => {
          this.setState({usernameReg: event.target.value});
        }}
        />

        <p className="errorMsg">{this.state.usernameInputStatus}</p>

        <label>Password</label>
        <input 
        type="password"
        required
        autoFocus
        onChange={(event) => {
          this.setState({passwordReg1: event.target.value});
        }}
        />
        <p className="errorMsg">{this.state.password1InputStatus}</p>

        <label>Repeat password</label>
        <input 
        type="password"
        required
        autoFocus
        onChange={(event) => {
          this.setState({passWordReg2: event.target.value});
        }}
        />
        <p className="errorMsg">{this.state.password2InputStatus}</p>

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