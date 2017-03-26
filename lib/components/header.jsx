import React from 'react';
import { Link } from 'react-router-dom';

const ui = {
  home:  {resource: '/',      link:'home',  iconName: 'home' },
  about: {resource: '/about', link:'about', iconName: 'help' }
}

export default ({ user }) => {
  console.log(JSON.stringify(user))
  const links = [ui.home, ui.about];
  const listItems = links.map(currentItem => {
    return (
      <li key={currentItem.resource} style={listItemStyle}>
        <i className={'material-icons'}>{currentItem.iconName}</i>
        <Link style={linkStyle} to={currentItem.resource}>{currentItem.link}</Link>
      </li>
    );
  });

  return (
    <div style={topMenuStyle}>
      <div style={containerStyle}>
        <img src="logo.svg" style={logoStyle}></img>
        <ul style={topMenuListStyle}>
          {listItems}
        </ul>
        <div className={'push-right'}>
          <p>{`Hello 11`}</p>
        </div>
      </div>
    </div>
  );
};

const linkStyle = {
  textTransform: 'capitalize',
}

const listItemStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '15px',
};

const topMenuListStyle = {
  alignItems: 'center',
  listStyle: 'none',
  display: 'flex',
};

const logoStyle = {
  width: '65px',
  marginRight: '30px',
};

const containerStyle = {
  display: 'flex',
  height: '100%',
  width: '80%',
  margin: '0px auto',
}

const topMenuStyle = {
  display: 'flex',
  width: '100%',
  backgroundColor: '#3E424E',
  color: 'white',
  height: '5vh',
  minHeight: '35px',
};
