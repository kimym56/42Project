import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Monthly from "./Monthly";
import Weekly from "./Weekly";
import TestWeek from "./testApp.js";
import TestDaily from "./test1.js";
import { TabView, SceneMap } from "react-native-tab-view";
import AddEvent from "./AddEvent";

export default function Calendar(props) {
  const [index, setIndex] = useState(0);
  const MonthRoute = () => <Monthly navigation={props.navigation} />;
  const WeeklyRoute = () => <Weekly />;
  const TestWeekRoute = () => <TestWeek navigation={props.navigation} />;
  const TestDailyRoute = () => <TestDaily navigation={props.navigation} />;
  const renderScene = SceneMap({
    monthly: MonthRoute,
    testweek: TestWeekRoute,
    testdaily: TestDailyRoute,
    weekly: WeeklyRoute,
  });
  const [routes] = React.useState([
    { key: "monthly", title: "Monthly" },
    { key: "weekly", title: "Weekly" },
    { key: "testweek", title: "TestWeek" },
    { key: "testdaily", title: "TestDaily" },
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
