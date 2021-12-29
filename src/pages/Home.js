import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {TabBarAdvancedButton} from '../components/Tabbar/TabBarAdvancedButton'
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
        tabBarIconStyle: { display: "none" },
        tabBarStyle: {
          position: "absolute",
          elevation: 0,
          borderRadius: 10,
          height: 70,
        },
      }}
    >
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="AddEvent"  options={{
          tabBarButton: (props) => (
            <TabBarAdvancedButton
              bgColor={'red'}
              {...props}
            />
          )
        }}component={AddEvent} />
      {/* <Tab.Screen name="Feed" component={Feed} /> */}
      <Tab.Screen name="MyPage" component={MyPage} />
    </Tab.Navigator>
  );
}
