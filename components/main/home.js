import React from "react";

import Calendar from "./Calendar";
import Catch from "./Catch";

import Monthly from "./Monthly";
import Weekly from "./Weekly";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddEvent from "./AddEvent";

const Tab = createBottomTabNavigator();

export default function home() {
  console.log("home render");
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { position: "relative" },
        tabBarActiveTintColor: "#e91e63",
      }}
    >
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="AddEvent" component={AddEvent} />
      <Tab.Screen name="Catch" component={Catch} />
      <Tab.Screen name="Monthly" component={Monthly} />
      <Tab.Screen name="Weekly" component={Weekly} />
    </Tab.Navigator>
  );
}
