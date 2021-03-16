import React, { Component } from 'react';
import './RegistrationConfirmed.css'

class RegistrationConfirmed extends Component {
    
    goBackToLogin =() => {
        this.props.history.push('/');
      }

  render() {
    return (

    <section className="Confirmation">
        
    <div className="confirmationContainer">
    <p>Your account has been created!</p>
    <div className="buttonContainer">
        <p>
            <span onClick={this.goBackToLogin}>Go back to login</span>
        </p>
        </div>
        </div>

    </section>
    );
  }
};

export default RegistrationConfirmed;