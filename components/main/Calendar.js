import React, { Component, PureComponent, useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import Monthly from "./Monthly";
import Weekly from "./Weekly";
import Daily from "./Daily.js";
import { TabView, SceneMap } from "react-native-tab-view";
import AddEvent from "./AddEvent";

const LazyPlaceholder = ({ route }) => (
  <View>
    <Text>Loading {route.title}…</Text>
  </View>
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
        lazy
        navigationState={this.state}
        renderScene={this.renderScene}
        renderLazyPlaceholder={this._renderLazyPlaceholder}
        onIndexChange={this._handleIndexChange}
<<<<<<< HEAD
        initialLayout={{ width: Dimensions.get("window").width }}
=======
        //initialLayout={{ width: Dimensions.get("window").width }}
>>>>>>> ff7d39d7c4a91831af4819c6da007973b867d003
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