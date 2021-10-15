// @flow

import React, { PureComponent } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class CalendarDay extends PureComponent {
  render() {
    const { active, selected, first, last, number } = this.props; //deselected,
    let dayContainerStyleOdd;
    let dayContainerStyleEven;

    if (!active && !selected) {
      //&& !deselected
      dayContainerStyleOdd = styles.dayContainerOdd;
      dayContainerStyleEven = styles.dayContainerEven;
    } else {
      // 이미 선택된 셀을 다시 선택시 취소하도록 하는 기능의 스타일 부분
      /*if (deselected)
        dayContainerStyle = [styles.dayContainer, { backgroundColor: "red" }];
      else*/
      if (selected) {
        dayContainerStyleOdd = [
          styles.dayContainerOdd,
          { backgroundColor: "green" },
        ];
        dayContainerStyleEven = [
          styles.dayContainerEven,
          { backgroundColor: "green" },
        ];
      } else if (active) {
        dayContainerStyleOdd = [
          styles.dayContainerOdd,
          { backgroundColor: "blue" },
        ];
        dayContainerStyleEven = [
          styles.dayContainerEven,
          { backgroundColor: "blue" },
        ];
      }
      /*
      if (first) {
        dayContainerStyle.push(styles.firstActiveDayContainer);
      }
      if (last) {
        dayContainerStyle.push(styles.lastActiveDayContainer);
      }*/
    }
    if (number > 48) {
      return (
        <View style={number % 2 ? dayContainerStyleOdd : dayContainerStyleEven}>
          <View
            style={{
              flex: 1,
              marginVertical: 15,
              height: 1,
              backgroundColor: "pink",
            }}
          />
          <Text> {}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.dayContainer48}>
          <Text style={{ fontSize: 10 }}>
            {" "}
            {number % 2 ? Math.floor(number / 2 - 0.5) : null}
          </Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  dayContainer48: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    height: 30,
    marginVertical: 0,
    marginLeft: 0,
    //  backgroundColor: "skyblue",
    borderWidth: 1,
    borderColor: "skyblue",
    borderRightColor: "gray",
  },
  dayContainerOdd: {
    flex: 1,
    flexDirection: "row",
    //alignItems: "center",
    justifyContent: "center",
    height: 30,
    marginVertical: 0,
    marginLeft: 0,
    paddingBottom: 10,
    //    backgroundColor: "skyblue",
    borderWidth: 1,
    borderColor: "gray",
    borderBottomWidth: 0.25,
  },
  dayContainerEven: {
    flex: 1,
    flexDirection: "row",
    //alignItems: "center",
    justifyContent: "center",

    height: 30,
    marginVertical: 0,
    marginLeft: 0,
    //    backgroundColor: "skyblue",
    borderWidth: 1,
    borderColor: "gray",
    borderTopWidth: 0.25,
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
