import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View } from 'react-native';
import Loading from './components/Loading.js';
import Register from './components/Register';


export class App extends Component {
  state = {
    isLoading: true
  };
  componentDidMount = async () => {
    setTimeout(() => { this.setState({ isLoading: false }) }, 2000);
  };

  render() {
    if (this.state.isLoading) {
      return <Loading />
    }
    else {
      return <Register />;
    }
  }
}
export default App;