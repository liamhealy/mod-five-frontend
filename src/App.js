import React from 'react';
import './App.css';
import Login from './containers/Login';
import { connect } from 'react-redux';
import NavBar from './components/NavBar';
import MainContainer from './containers/MainContainer';

class App extends React.Component {
  
  state = {
    currentUser: null
  }

  signIn = (user) => {
    fetch(`http://localhost:3000/api/v1/users/${user.username}`)
    .then(resp => resp.json())
    .then(json => {
      if (json.data) {
        this.setState({
          currentUser: json
        })
      } else {
        // Display errors at some point
      }
    })
  }

  signUp = (newUser) => {
    fetch('http://localhost:3000/api/v1/users', {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(newUser)
    })
    .then(resp => resp.json())
    .then(json => {
      if (json.data) {
        this.setState({
          currentUser: json
        })
      } else {
        // Display errors at some point
      }
    })
  }

  render() {
    console.log(this.state.currentUser)
    return (
      <div className="App">
        {this.state.currentUser
          ? 
          <>
            <NavBar />
            <MainContainer />
          </>
          :
          <Login handleSignUp={this.signUp} handleSignIn={this.signIn} />
        }
      </div>
    );
  }
}

function msp(state) {
  return { user: state.user }
}

export default connect(msp)(App);
