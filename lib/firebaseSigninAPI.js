import firebase from 'firebase';

const firebaseConf = {
  apiKey: "AIzaSyAyTbFTm6al2lHZ0xctrC_HEaG_oL63X_Q",
  authDomain: "apollobytes-internal.firebaseapp.com",
  databaseURL: "https://apollobytes-internal.firebaseio.com",
  storageBucket: "apollobytes-internal.appspot.com",
  messagingSenderId: "514298207210"
};
firebase.initializeApp(firebaseConf);

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

  firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
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
    alert('Email Verification Sent!');
  });
}

const sendPasswordReset = (email) => {
  firebase.auth().sendPasswordResetEmail(email).then(() => {
    alert('Password Reset Email Sent!');
  }).catch(error => {
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
    if (!emailVerified) {
      sendEmailVerification();
    }
    if (displayName === null) {
      const newName = email.split("@")[0];
      user.updateProfile({
        displayName: newName,
      }).catch(error => console.log)
    }
    if (photoURL === null) {
      user.updateProfile({
        photoURL: "/profile.svg",
      }).catch(error => console.log)
    }
  }
  else {

  }
});

const checkLoggedIn = () => {
  return !!(currentUser);
}

const getHeaderInfo = () => {
  console.log(`User is: ${currentUser}`)
}

export default {
  handleSignIn,
  handleSignOut,
  handleSignUp,
  sendEmailVerification,
  sendPasswordReset,
  //initApp,
  checkLoggedIn,
  getHeaderInfo,
}
