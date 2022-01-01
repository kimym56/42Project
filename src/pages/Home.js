import React from "react";
import { StyleSheet, View } from 'react-native';
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
        tabBarStyle : 
        styles.navigator,
        
      }}
    >
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="AddEvent"  options={{
          tabBarButton: (props) => (
            <TabBarAdvancedButton
              bgColor={'black'}
              {...props}
            />
          )
        }}component={AddEvent} />
      {/* <Tab.Screen name="Feed" component={Feed} /> */}
      <Tab.Screen name="MyPage" component={MyPage} />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigatorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  navigator: {
    borderTopWidth: 0,
    backgroundColor: 'green',
    elevation: 30
  },
  xFillLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 34
  }
});