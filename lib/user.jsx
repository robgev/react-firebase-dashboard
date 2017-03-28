import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Footer from './components/footer';
import Header from './components/header';

export default
class User extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      password: '',
      newPassword: '',
      showBanner: false,
    }
  }

  showBanner = () => {
    this.setState({...this.state, showBanner: true})
    setTimeout(() => {
      this.setState({...this.state, showBanner: false})
    }, 3000)
  }

  handleMailChange = e => {
    const email = e.target.value;
    this.setState({...this.state, email});
  }

  handleNameChange = e => {
    const name = e.target.value;
    this.setState({...this.state, name});
  }

  handlePassChange = e => {
    const password = e.target.value;
    this.setState({...this.state, password});
  }

  handleNewPassChange = e => {
    const newPassword = e.target.value;
    this.setState({...this.state, newPassword});
  }

  deleteAccount = () => { // Should think about a way of implementing
    const { deleteUser } = this.props; // Popup, modal smth else?
  }

  updatePhoto = () => { // Should think about a way of implementing
    const { updatePhoto } = this.props;
  }

  submitData = () => {
    const { changePass, updateName, updateEmail } = this.props;
    const { email, password, newPassword, name } = this.state;
    let shouldShowBanner = false;
    if(email.trim()) {
      updateEmail(email);
      shouldShowBanner = true;
    }
    if(password.trim() && newPassword.trim()) {
      changePass(password, newPassword);
      shouldShowBanner = true;
    }
    if(name.trim()) {
      updateName(name);
      shouldShowBanner = true;
    }
    if(shouldShowBanner) {
      this.showBanner();
    }
  }

  render() {
    const { showBanner } = this.state;
    const { user } = this.props;
    const { displayName, email, emailVerified, photoURL, uid, providerData } = user;
    return (
      <div className="userContainer full-width">
        <Header
          user={user}
          signOut={this.props.signOut}
        />
        {
          showBanner ?
          <div className="banner">
            Saved Sucessfully
          </div>
          : null
        }
        <div className="user-body">
          <div className="image">
            <img src={photoURL} />
            <button>Delete Account</button>
          </div>
          <div className="editableData">
            <div className="form-group">
              <label htmlFor="displayName">Change display name:</label>
              <input
                type='text'
                id="displayName"
                onChange={this.handleNameChange}
                placeholder={displayName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Change e-mail:</label>
              <input
                type='email'
                id="email"
                onChange={this.handleMailChange}
                placeholder={email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Change password:</label>
              <div className="form-password">
                <input
                  type='password'
                  id="password"
                  onChange={this.handlePassChange}
                  placeholder='Old Password'
                />
                <input
                  type='password'
                  onChange={this.handleNewPassChange}
                  placeholder='New Password'
                />
              </div>
            </div>
            <button onClick={this.submitData}>Save</button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};
