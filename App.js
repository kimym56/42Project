import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { render } from "react-dom";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Loading from "./components/auth/Loading";
import Register from "./components/auth/Register";
import Landing from "./components/auth/Landing";
import Login from "./components/auth/Login";

import home from "./components/main/home";
import Catch from "./components/main/Catch";
import AddEvent from "./components/main/AddEvent";

import Calendar from "./components/main/Calendar";
import test from "./components/main/test";

const CalendarStack = createStackNavigator();

function CalendarStackScreen() {
  return (
    <CalendarStack.Navigator screenOptions={{ headerShown: false }}>
      <CalendarStack.Screen name="Calendar" component={Calendar} />
      <CalendarStack.Screen name="AddEvent" component={AddEvent} />
    </CalendarStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

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
          <Tab.Navigator>
            <Tab.Screen name="Calendar" component={CalendarStackScreen} />
            <Tab.Screen name="AddEvent" component={AddEvent} />
            <Tab.Screen name="Catch" component={Calendar} />
          </Tab.Navigator>
        </NavigationContainer>
        /*
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing"  screenOptions={{headerShown: false}}>
            <Stack.Screen
              name="Landing"
              component={Landing}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />

            <Stack.Screen name="home" component={home} />
            <Stack.Screen name="AddEvent" component={AddEvent} />
            
            <Stack.Screen name="test" component={test} />
          </Stack.Navigator>
        </NavigationContainer>
        */
      );
    }
  }
}
export default App;
