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
      <div className="full-width">
        <Header user={user} />
        <div style={{height: '500px'}}>

        </div>
        <Footer />
      </div>
    );
  }
};
