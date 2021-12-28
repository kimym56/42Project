import { StatusBar } from "expo-status-bar";
import React, { PureComponent } from "react";
import { render } from "react-dom";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Loading from "./pages/Loading";
import Register from "./pages/MyPage/Register";
import Login from "./pages/MyPage/Login";
import Home from "./pages/Home";
import AddEvent from "./pages/AddEvent";
import Calendar from "./pages/Calendar";
import TotalList from "./pages/Feed/Total/TotalList";
import { store } from "./rdx/store";
import { Provider } from "react-redux";

const CalendarStack = createStackNavigator();

function CalendarStackScreen() {
  return (
    <CalendarStack.Navigator screenOptions={{ headerShown: false }}>
      <CalendarStack.Screen name="Calendar" component={Calendar} />
      <CalendarStack.Screen name="AddEvent2" component={AddEvent} />
    </CalendarStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

export class App extends PureComponent {
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
        /*
        // Test stack navigator in tab navigator
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Calendar" component={CalendarStackScreen} />
            <Tab.Screen name="AddEvent" component={AddEvent} />
            <Tab.Screen name="Catch" component={Catch} />
          </Tab.Navigator>
        </NavigationContainer>
*/
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              
            >
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Login" component={Login} />

              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AddEvent2"
                component={AddEvent}
                options={{ title: "AddEvent" }}
              />
              <Stack.Screen
                name="TotalList"
                component={TotalList}
                options={{ headerShown: true }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      );
    }
  }
}
export default App;
