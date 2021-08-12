import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { render } from "react-dom";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Loading from "./components/auth/Loading";
import Register from "./components/auth/Register";
import Landing from "./components/auth/Landing";
import Login from "./components/auth/Login";

const Stack = createStackNavigator();

export class App extends Component {
  state = {
    isLoading: true,
    loggedIn: false,
  };
  componentDidMount = async () => {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000);
  };

  render() {
    const { isLoading, loggedIn } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={Landing}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  }
}
export default App;
