import React from "react";

import Calendar from "./Calendar";

import Landing from "../auth/Landing";
import Feed from "./Feed"

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
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="AddEvent" component={AddEvent} />
      <Tab.Screen name="MyPage" component={Landing} />
    </Tab.Navigator>
  );
}
