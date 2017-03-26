import React from 'react';

export default ({ user }) => {
  return (
    <div style={missingStyle}>
        <img src="/missing.png" style={imgStyle} />
        <div style={banner} >
          <h2 style={bannerHead}>Woopsie Daisy!</h2>
          <p style={bannerText}>
            Looks like something went completely wrong! <br />
            Everyone sometimes makes mistakes, don't worry.
          </p>
          <br />
          <p style={bannerText}>
            Error code: 404
          </p>
        </div>
    </div>
  );
};


const missingStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%',
  height: '100vh',
  backgroundColor: '#3E424E',
  color: 'white',
  minHeight: '35px',
};

const bannerHead = {
  color: 'white',
  marginBottom: '20px',
  fontSize: '75px',
}

const bannerText = {
  fontSize: '21px',
  textAlign: 'center',
};

const banner = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
}

const imgStyle = {
  height: '100%'
}
