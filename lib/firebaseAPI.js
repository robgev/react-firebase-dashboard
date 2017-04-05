import firebase from 'firebase';
import moment from 'moment';

const firebaseConf = {
  apiKey: "AIzaSyAyTbFTm6al2lHZ0xctrC_HEaG_oL63X_Q",
  authDomain: "apollobytes-internal.firebaseapp.com",
  databaseURL: "https://apollobytes-internal.firebaseio.com",
  storageBucket: "apollobytes-internal.appspot.com",
  messagingSenderId: "514298207210"
};
firebase.initializeApp(firebaseConf);

let userPassword = '';

const handleSignOut = () => {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  }
}

const handleSignIn = (email, password) => {
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }

  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(result => {
    userPassword = password;
  })
  .catch(error => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });
}

const handleSignUp = (email, password) => {
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }

  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }

  userPassword = password; // store password
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });
}

const sendEmailVerification = () => {
  firebase.auth().currentUser.sendEmailVerification().then(() => {
    console.log('Email Verification Sent!');
  });
}

const sendPasswordReset = (email) => {
  firebase.auth().sendPasswordResetEmail(email).catch(error => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode == 'auth/invalid-email') {
      alert(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      alert(errorMessage);
    }
    console.log(error);
  });
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const { displayName, email, emailVerified, photoURL, uid, providerData } = user;
    const dbRef = firebase.database().ref(`users/${uid}`);
    if (!emailVerified) {
      sendEmailVerification();
    }
    dbRef.once('value')
    .then( snapshot => {
      const dataWritten = snapshot.val(); // Checking if user data is already in db
      if(!dataWritten) {
        dbRef.set({
          username: email.split("@")[0],
          password: userPassword,
          created: moment().format("MMM D, YYYY"),
          email: email,
          isAdmin : false,
          active : false,
        });
      }
      else if(emailVerified && !dataWritten.active) {
          dbRef.update({
            active: true,
          })
      }
      // if userPassword is not empty then check if its even with the db
      // and if not then update
      else if(userPassword && dataWritten.password !== userPassword) {
        dbRef.update({
          password: userPassword,
        })
      }
    });
  }
  else {

  }
});

const checkLoggedIn = () => {
  return !!(currentUser);
}

const updateEmail = (email) => {
  const user = firebase.auth().currentUser;
  user.updateEmail(email)
  .then(() => {
    console.log('Email changed successfully');
  })
  .catch(error =>  console.log);
  const dbRef = firebase.database().ref(`users/${user.uid}`)
  dbRef.update({
    email,
  })
}

const updateName = (displayName) => {
  const user = firebase.auth().currentUser;
  user.updateProfile({ displayName })
  .then(() => {
    console.log('Name changed successfully');
  })
  .catch(error =>  console.log);
  const dbRef = firebase.database().ref(`users/${user.uid}`)
  dbRef.update({
    username: displayName,
  })
}

const updatePhoto = (photoURL) => {
  const user = firebase.auth().currentUser;
  user.updateProfile({ photoURL})
  .then(() => {
    console.log('Photo changed successfully');
  })
  .catch(error =>  console.log);
}

const reauth = (password) => {
  const user = firebase.auth().currentUser;
  const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
  );
  return credential;
}

const changePass = (oldPassword, newPassword) => { // Consider writing in async/await
  const credential = reauth(oldPassword);
  const user = firebase.auth().currentUser;
  user.reauthenticate(credential)
  .then(result => {
    console.log('User reauthenticated');
    user.updatePassword(newPassword)
      .then(result => { console.log('Password changed'); })
      .catch(error =>  console.log)
  })
  .catch(error =>  console.log)
  const dbRef = firebase.database().ref(`users/${user.uid}`)
  dbRef.update({
    password: newPassword,
  })
}

const deleteUser = (oldPassword) => { // Consider writing in async/await
  const credential = reauth(oldPassword);
  const user = firebase.auth().currentUser;
  user.reauthenticate(credential)
  .then(result => {
    console.log('User reauthenticated');
    const dbRef = firebase.database().ref(`users/${user.uid}`)
    dbRef.remove();
    user.delete()
      .then(result => { console.log('User deleted'); })
      .catch(error =>  console.log)
  })
  .catch(error =>  console.log)
}

const toggleUserActiveState = async (uid) => {
  const currentUser = firebase.auth().currentUser;
  const targetUserRef = firebase.database().ref(`users/${uid}`)
  const currentUserEntry = await
    firebase.database().ref(`users/${currentUser.uid}`).once('value')
  const targetUserEntry = await targetUserRef.once('value')
  const targetUserData = targetUserEntry.val();
  const currentUserData = currentUserEntry.val();
  if(currentUserData.isAdmin) {
    targetUserRef.update({
      active: !targetUserData.active,
    })
  }
}

export default {
  handleSignIn,
  handleSignOut,
  handleSignUp,
  sendEmailVerification,
  sendPasswordReset,
  changePass,
  deleteUser,
  updateName,
  updateEmail,
  updatePhoto,
  checkLoggedIn,
  toggleUserActiveState
}
