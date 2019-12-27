import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import MainContainer from './containers/MainContainer';
import { BrowserRouter as Router } from 'react-router-dom';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Router>
          <MainContainer />
        </Router>
      </div>
    );
  }
}

function msp(state) {
  return { user: state.user }
}

export default connect(msp)(App);
