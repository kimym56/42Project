import React, { useState } from "react";
import { View, Text } from "react-native";

import Total from "./Total/Total.js";
import Interest from "./Interest/Interest.js";

import { TabView, SceneMap } from "react-native-tab-view";
const LazyPlaceholder = ({ route }) => (
  <View>
    <Text>Loading {route.title}…</Text>
  </View>
);
export default function Feed(props) {
  const [state, setState] = useState({
    index: 0,
    routes: [
      { key: "total", title: "Total" },
      { key: "interest", title: "Interest" },
    ],
  });
  const TotalR = () => <Total navigation={props.navigation} />;
  const InterestR = () => <Interest navigation={props.navigation} />;
  const renderScene = SceneMap({
    total: TotalR,
    interest: InterestR,
  });
  const _renderLazyPlaceholder = ({ route }) => (
    <LazyPlaceholder route={route} />
  );
  const _handleIndexChange = (idx) => setState({ ...state, index: idx });

  return (
    <TabView
      lazy
      navigationState={state}
      renderScene={renderScene}
      renderLazyPlaceholder={_renderLazyPlaceholder}
      onIndexChange={_handleIndexChange}
      //initialLayout={{ width: Dimensions.get("window").width }}
    />
  );
}
