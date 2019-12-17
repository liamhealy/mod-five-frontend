import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import MainContainer from './containers/MainContainer';

class App extends React.Component {
  
  state = {
    currentUser: null
  }

  render() {
    console.log(this.state.currentUser)
    return (
      <div className="App">
        <MainContainer currentUser={this.state.currentUser} />
      </div>
    );
  }
}

function msp(state) {
  return { user: state.user }
}

export default connect(msp)(App);
