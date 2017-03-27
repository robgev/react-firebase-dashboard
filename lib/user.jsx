import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Footer from './components/footer';
import Header from './components/header';

export default
class User extends Component {
  constructor() {
    super();
  }

  render() {
    const { user } = this.props;
    const { displayName, email, emailVerified, photoURL, uid, providerData } = user;
    return (
      <div className="userContainer full-width">
        <Header
          user={user}
          signOut={this.props.signOut}
        />
        <div className="user-body">
          <div className="image">
            <img src={photoURL} />
            <button>Delete Account</button>
          </div>
          <div className="editableData">
            <input type='text' placeholder={displayName} />
            <input type='password' placeholder={email} />
            <input type='password' placeholder='Password' />
            <button>Save</button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};
