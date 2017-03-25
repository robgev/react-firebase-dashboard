import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import signin from './firebaseSigninAPI';

import SigninBox from './signin'
import './main.scss';

class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    signin.initApp();
  }

  render() {
    return (
      <div className='container'>
        <h2>Apollo Bytes SignIn</h2>
        <SigninBox submit={signin.handleSignIn}/>
      </div>
    );
  }
};

ReactDOM.render(<App />,
		document.getElementById('react-container'));
