import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom';

import auth from './firebaseAPI';
import SigninBox from './signin';
import AdminPanel from './admin';
import User from './user';
import NotFound from './components/notfound';
import LoadingScreen  from './components/loadingscreen'
import './main.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {}, // to avoid first un-signed in render when some1 is signed in
      promise: new Promise(resolve=>{}),
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(currentUser => {
      if (currentUser) {
        const { displayName, email, emailVerified, photoURL, uid, providerData } = currentUser;
        if (displayName === null) {
          const newName = email.split("@")[0];
          currentUser.updateProfile({
            displayName: newName,
          })
          .then(() => this.setState({...this.state, currentUser}))
          .catch(error => console.log)

        }
        if (photoURL === null) {
          currentUser.updateProfile({
            photoURL: "/profile.svg",
          })
          .then(() => this.setState({...this.state, currentUser}))
          .catch(error => console.log)
        }
        const dbRef = firebase.database().ref(`users/${uid}`)
        const promise = dbRef.once('value')
        this.setState({...this.state, promise, currentUser})
      }
      else {
        const currentUser = null;
        this.setState({...this.state, currentUser})
      }
    });
  }

  render() {
    const { currentUser, isAdmin, promise } = this.state;
    return (
      <div className='container'>
        <Router>
          <div className='router-wrapper'>
            <Switch>
              <Route
                exact path="/"
                render={() =>
                currentUser ?
                    <Redirect to="/user"/>
                  : <Redirect to="/signin"/>
                }
              />
              <Route
                path="/signin"
                render={ props =>
                  !currentUser ?
                  <SigninBox
                    submit={auth.handleSignIn}
                    signUp={auth.handleSignUp}
                    passwordReset={auth.sendPasswordReset}
                    {...props}
                  /> :
                  <Redirect to="/user"/>
                 }
              />
              <Route
                path="/user"
                render={ props => {
                  if(currentUser) {
                    return(
                      <LoadingScreen
                        promise={ promise }
                        whenPending= { () => {
                          return (
                            <div className="loading-screen">
                              <img src="/loading.gif" />
                            </div>
                          );
                        }}
                        whenResolved={ snapshot => {
                          const value = snapshot.val();
                          const isAdmin = value ? value.isAdmin : false;
                          return (
                            <User
                              user = {currentUser}
                              signOut={auth.handleSignOut}
                              changePass={auth.changePass}
                              deleteUser={auth.deleteUser}
                              updateName={auth.updateName}
                              updateEmail={auth.updateEmail}
                              updatePhoto={auth.updatePhoto}
                              admin={isAdmin}
                              {...props}
                            />
                          );
                        }}
                      />
                    );
                  }
                  else {
                    return (
                      <Redirect to="/signin"/>
                    );
                  }
                }}
              />
              <Route
                path="/admin"
                render={ props => {
                    if(currentUser) {
                      return(
                        <LoadingScreen
                          promise={ promise }
                          whenPending= { () => {
                            return (
                              <div className="loading-screen">
                                <img src="/loading.gif" />
                              </div>
                            );
                          }}
                          whenResolved={ snapshot => {
                            const value = snapshot.val();
                            const isAdmin = value ? value.isAdmin : false;
                            if(isAdmin) {
                              return (
                                <AdminPanel
                                  user = {currentUser}
                                  dbRef = {firebase.database().ref('users')}
                                  signOut={auth.handleSignOut}
                                  changePass={auth.changePass}
                                  deleteUser={auth.deleteUser}
                                  updateName={auth.updateName}
                                  updateEmail={auth.updateEmail}
                                  updatePhoto={auth.updatePhoto}
                                  admin={isAdmin}
                                  {...props}
                                />
                              );
                            }
                            else {
                              return (
                                <Route component={NotFound} />
                              );
                            }
                          }}
                        />
                      );
                    }
                    else {
                      return (
                        <Redirect to="/signin"/>
                      );
                    }
                  }
                }
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
};

ReactDOM.render(<App />,
		document.getElementById('react-container'));
