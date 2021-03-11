import React, { Component } from 'react';

class Registration extends Component {
  handleClick() {
    this.props.history.push('/');
  }
  render() {
    return (
      <button type="button" onClick={() => this.handleClick()}>
        Go back to login
      </button>
    );
  }
};

export default Registration;