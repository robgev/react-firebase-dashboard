import React, { Component } from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

export default
class SigninBox extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      showModal: false,
      showBanner: false,
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

  notifyAndReset = () => {
    this.setState({
      ...this.state,
      showModal: false,
      showBanner: true,
    })
    setTimeout(() => {
      this.setState({...this.state, showBanner: false})
    }, 1000)
  }

  passwordReset = () => {
    const { email } = this.state;
    this.props.passwordReset(email);
    this.notifyAndReset();
  }

  handleModalClose = () => {
    this.setState({...this.state, showModal: false});
  }

  modalShow = () => {
    this.setState({...this.state, showModal: true});
  }

  render() {
    const { email, password, showBanner, showModal } = this.state;
    return (
      <div className="signin-wrapper">
        {
          showBanner &&
          <div className="banner">
            Email sent successfully
          </div>
        }
        <div className="signin">
          <h2>Apollo Bytes SignIn</h2>
          <div className='wrapper'>
            <input type='email' placeholder='Email'  onChange={this.mailChangeHandler} />
            <input type='password' placeholder='Password'  onChange={this.passChangeHandler} />
            <button onClick={this.handleSignIn}>Sign In</button>
            <button onClick={this.handleSignUp}>Sign Up</button>
            <a className="forgot" onClick={this.modalShow}>Forgot Password?</a>
            {
              showModal &&
              <ModalContainer onClose={this.handleModalClose}>
                <ModalDialog onClose={this.handleModalClose} className="modal-dialog">
                  <h1>Enter your email</h1>
                  <p>We will sent you an email with a reset link</p>
                  <input type='email' placeholder='Email'  onChange={this.mailChangeHandler} />
                  <button onClick={this.passwordReset}>Send</button>
                </ModalDialog>
              </ModalContainer>
            }
          </div>
        </div>
      </div>
    );
  }
};
