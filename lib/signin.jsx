import React, { Component } from 'react';

export default
class SigninBox extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    }
  }

  mailChangeHandler = (e) => {
    const email = e.target.value;
    this.setState({...this.state, email});
  }

  passChangeHandler = (e) => {
    const password = e.target.value;
    this.setState({...this.state, password});
  }

  handleSignIn = () => {
    const { email, password } = this.state;
    this.props.submit(email, password);
  }

  handleSignUp = () => {
    const { email, password } = this.state;
    this.props.signUp(email, password);
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className='wrapper'>
        <input type='text' placeholder='Email'  onChange={this.mailChangeHandler} />
        <input type='password' placeholder='Password'  onChange={this.passChangeHandler} />
        <button onClick={this.handleSignIn}>Sign In</button>
        <button onClick={this.handleSignUp}>Sign Up</button>
      </div>
    );
  }
};
