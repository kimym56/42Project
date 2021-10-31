import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Calendar from "./Calendar";
import AddEvent from "./AddEvent";
import MyPage from "./MyPage";
import Feed from "./Feed";

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
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="MyPage" component={MyPage} />
    </Tab.Navigator>
  );
}
