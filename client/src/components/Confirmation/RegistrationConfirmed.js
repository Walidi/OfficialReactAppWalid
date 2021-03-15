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
        <p>
            <span onClick={this.goBackToLogin}>Go back to login</span>
        </p>
        </div>
    </section>
    );
  }
};

export default RegistrationConfirmed;