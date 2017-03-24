import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './main.scss';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <p className='hello'>
        Hello World
      </p>
    );
  }
};

ReactDOM.render(<App />,
		document.getElementById('react-container'));
