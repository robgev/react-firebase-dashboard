import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Footer from './components/footer';
import Header from './components/header';
import LoadingScreen from './components/loadingscreen';

export default
class AdminPanel extends Component {
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

  getUsersData = () => {
    const { user, dbRef } = this.props;
    const promise = dbRef.once('value');
    return (
      <tbody>
        <LoadingScreen
          promise={ promise }
          whenPending= { () => {
            return (
              <tr>
                <td colSpan="5">
                  <div className="loading-screen users">
                    <img src="/loadingSmall.gif" />
                  </div>
                </td>
              </tr>
            )
          }}
          whenResolved={ snapshot => {
            const value = snapshot.val();
            return (
              <tr>
                <td>
                  <div>
                    Robert Gevorgyan
                  </div>
                </td>
                <td>
                  <div>
                    Date Here
                  </div>
                </td>
                <td>
                  <div>
                    robert1999.g@gmail.com
                  </div>
                </td>
                <td>
                  <div>
                    myPass
                  </div>
                </td>
                <td>
                  <div>
                    true
                  </div>
                </td>
              </tr>
            );
          }}
        />
      </tbody>
    );
  }

  render() {
    const { showBanner } = this.state;
    const { user } = this.props;
    const { displayName, email, emailVerified, photoURL, uid, providerData } = user;
    return (
      <div className="adminContainer full-width">
        <Header
          user={user}
          admin={true}
          signOut={this.props.signOut}
        />
        {
          showBanner ?
          <div className="banner">
            Saved Sucessfully
          </div>
          : null
        }
        <div className="admin-body">
          <div className="buttons">
            <button onClick={this.submitData}>Deactivate</button>
            <button onClick={this.submitData}>Add</button>
            <button onClick={this.submitData}>Edit</button>
            <button onClick={this.submitData}>Delete</button>
          </div>
          <div className="table-body">
            <div className="toolbar">
              <i className="material-icons">search</i>
              <input
                type='text'
                className='search'
                placeholder=' Search by email address or user UID '
              />
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>
                      <div>
                        Name
                        <i className="material-icons">arrow_downward</i>
                      </div>
                    </th>
                    <th>
                      <div>
                        Created
                        <i className="material-icons">arrow_downward</i>
                      </div>
                    </th>
                    <th>
                      <div>
                        Email
                        <i className="material-icons">arrow_downward</i>
                      </div>
                    </th>
                    <th>
                      <div>
                        Password
                        <i className="material-icons">arrow_downward</i>
                      </div>
                    </th>
                    <th>
                      <div>
                        Is Admin
                        <i className="material-icons">arrow_downward</i>
                      </div>
                    </th>
                  </tr>
                </thead>
                { this.getUsersData() }
              </table>
              <div className="pagination">
                Rows per page:
                <div className="pagination-dropdown">
                  50
                </div>
                1-3 of 3
                <div className="pagination-buttons">
                  <button>
                    <i className="material-icons">chevron_left</i>
                  </button>
                  <button>
                    <i className="material-icons">chevron_right</i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};
