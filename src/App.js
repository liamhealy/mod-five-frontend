import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import { connect } from 'react-redux';
import NavBar from './components/NavBar';
import MainContainer from './containers/MainContainer';


function App(props) {
  console.log(props.user)
  return (
    <div className="App">
      {props.user
        ? 
        <>
          <NavBar />
          <MainContainer />
        </>
        :
        <Login />
      }
    </div>
  );
}

function msp(state) {
  return { user: state.user }
}

export default connect(msp)(App);
