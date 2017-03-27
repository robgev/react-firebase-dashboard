import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';

import signin from './firebaseSigninAPI';
import SigninBox from './signin';
import AdminPanel from './admin';
import User from './user';
import NotFound from './components/notfound'
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
            <Switch>
              <Route
                path="/signin"
                render={ props =>
                  !currentUser ?
                  <SigninBox
                    submit={signin.handleSignIn}
                    signUp={signin.handleSignUp}
                    {...props}
                  /> : null }
              />
              <Route
                path="/user"
                render={ props =>
                  currentUser ?
                  <User
                    user = {currentUser}
                    signOut={signin.handleSignOut}
                    {...props}
                  /> : null //avoiding unauthorized render messing up
                }
              />
              <Route
                path="/admin"
                render={ props =>
                  currentUser ?
                  <AdminPanel
                    user = {currentUser}
                    {...props}
                  /> : null
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
