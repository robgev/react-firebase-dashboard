import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import signin from './firebaseSigninAPI';
import SigninBox from './signin';
import AdminPanel from './admin';
import User from './user';
import './main.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(currentUser => {
      if (currentUser) {
        this.setState({...this.state, currentUser})
        const { displayName, email, emailVerified, photoURL, uid, providerData } = currentUser;
        if (!emailVerified) {
          sendEmailVerification();
        }
      }
      else {
        const currentUser = null;
        this.setState({...this.state, currentUser})
      }
    });
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className='container'>
        <Router>
          <div className='router-wrapper'>
            <Route
              path="/signin"
              render={ props =>
                <SigninBox
                  submit={signin.handleSignIn}
                  signUp={signin.handleSignUp}
                  {...props}
                /> }
            />
            <Route
              path="/user"
              render={ props =>
                <User
                  user = {currentUser}
                  {...props}
                /> }
            />
            <Route
              path="/admin"
              render={ props =>
                <AdminPanel
                  user = {currentUser}
                  {...props}
                /> }
            />
          </div>
        </Router>
      </div>
    );
  }
};

ReactDOM.render(<App />,
		document.getElementById('react-container'));
