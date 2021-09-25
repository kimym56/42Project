import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Monthly from "./Monthly";
import Weekly from "./Weekly";
import Daily from "./Daily";
import { TabView, SceneMap } from "react-native-tab-view";
import AddEvent from "./AddEvent";

export default function Calendar(props) {
  const [index, setIndex] = useState(0);
  const MonthRoute = () => <Monthly navigation={props.navigation}/>;
  const WeeklyRoute = () => <Weekly />;
  const DailyRoute = () => <Daily />;
  const renderScene = SceneMap({
    monthly: MonthRoute,
    daily: DailyRoute,
    weekly: WeeklyRoute
  });
  const [routes] = React.useState([
    { key: "monthly", title: "Monthly" },
    { key: "weekly", title: "Weekly" },
    { key: "daily", title: "Daily" }
  ]);
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      animationEnabled={false}
      swipeEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
  TabBar: {
    color: "red",
  },
  TabLabel: {
    color: "blue",
  },
});
