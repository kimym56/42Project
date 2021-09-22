import React from "react";
import Monthly from "./Monthly";
import AddEvent from "./AddEvent";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
export default function home(props) {
  return (
    <Tab.Navigator screenOptions={{
        tabBarStyle: { position: "absolute" },tabBarActiveTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="Monthly"
        component={Monthly}
        
      />
      <Tab.Screen name="Weekly" component={Monthly} />
    </Tab.Navigator>
  );
}
