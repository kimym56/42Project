// @flow

import React, { PureComponent } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class CalendarDay extends PureComponent {
  render() {
    const { active, selected, first, last, number } = this.props; //deselected, 
    let dayContainerStyle;

    if (!active && !selected ) {//&& !deselected
      dayContainerStyle = styles.dayContainer;
    } else {
      // 이미 선택된 셀을 다시 선택시 취소하도록 하는 기능의 스타일 부분
      /*if (deselected)
        dayContainerStyle = [styles.dayContainer, { backgroundColor: "red" }];
      else*/ 
      if (selected)
        dayContainerStyle = [styles.dayContainer, { backgroundColor: "green" }];
      else if (active)
        dayContainerStyle = [styles.dayContainer, { backgroundColor: "blue" }];

      if (first) {
        dayContainerStyle.push(styles.firstActiveDayContainer);
      }
      if (last) {
        dayContainerStyle.push(styles.lastActiveDayContainer);
      }
    }
    return (
      <View style={dayContainerStyle}>
        <Text>{number}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dayContainer: {
    flex: 1,
    //flexDirection: "column",
    //alignItems: "center",
    justifyContent: "center",
    height: 30,
    marginVertical: 0,
    marginLeft: 0,
  },
  firstActiveDayContainer: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  lastActiveDayContainer: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});
