import React, { Component, PureComponent, useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import Monthly from "./Monthly/Monthly";
import Weekly from "./Weekly/Weekly";
import Daily from "./Daily/Daily.js";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import AddEvent from "../AddEvent";
import * as Font from "expo-font";

Font.loadAsync({
  "Pridi-ExtraLight": require("../../assets/fonts/Pridi-ExtraLight.ttf"),
});
const LazyPlaceholder = ({ route }) => (
  <View>
    <Text>Loading {route.title}…</Text>
  </View>
);
const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "black" }}
    style={{ backgroundColor: "white" }}
    renderLabel={({ route,color }) => (
      <Text style={{ color,fontFamily: "Pridi-Light", fontSize: 18 }}>
        {route.title}
      </Text>
    )}
    inactiveColor="rgba(0, 0, 0, 0.6)"
    activeColor="black"
  />
);
export default class Calendar extends Component {
  MonthlyRoute = () => <Monthly navigation={this.props.navigation} />;
  WeeklyRoute = () => <Weekly navigation={this.props.navigation} />;
  DailyRoute = () => <Daily navigation={this.props.navigation} />;
  state = {
    index: 0,
    routes: [
      { key: "monthly", title: "Monthly" },
      { key: "weekly", title: "Weekly" },
      { key: "daily", title: "Daily" },
    ],
  };
  renderScene = SceneMap({
    monthly: this.MonthlyRoute,
    weekly: this.WeeklyRoute,
    daily: this.DailyRoute,
  });

  _handleIndexChange = (index) => this.setState({ index });

  _renderLazyPlaceholder = ({ route }) => <LazyPlaceholder route={route} />;
  render() {
    console.log("calendar render");
    return (
      <TabView
        renderTabBar={renderTabBar}
        lazy
        navigationState={this.state}
        renderScene={this.renderScene}
        renderLazyPlaceholder={this._renderLazyPlaceholder}
        onIndexChange={this._handleIndexChange}
        //initialLayout={{ width: Dimensions.get("window").width }}
      />
    );
  }
}

const styles = StyleSheet.create({
  TabBar: {
    color: "red",
  },
  TabLabel: {
    color: "blue",
  },
});
