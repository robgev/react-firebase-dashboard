import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Footer from './components/footer';
import Header from './components/header';

export default
class AdminPanel extends Component {
  constructor() {
    super();
  }

  render() {
    const { user } = this.props;
    return (
      <div className="full-width">
        <Header user={user} />
        <div style={{height: '89.3vh'}}>

        </div>
        <Footer />
      </div>
    );
  }
};
