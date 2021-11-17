import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
} from "react-native";

import Test from "components/TimeSlot/TimeSlotSelector.js";
import TestDay from "components/TimeSlot/TimeSlotCell.js";
import PrevCalendarButton from "components/Buttons/PrevCalendarButton";
import NextCalendarButton from "components/Buttons/NextCalendarButton";
import DateCalendarText from "components/Texts/DateCalendarText";
export default class Weekly extends Component {
  weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  state = {
    days: [],
    currentDate: new Date(),
    todayDate: new Date(),
    tempDate: new Date(),
  };
  componentWillMount() {
    for (let i = 0; i < 384; i++) {
      this.state.days.push({
        id: Math.floor(48 * (i % 8) + (i / 8 + 1)),
        number: Math.floor(48 * (i % 8) + (i / 8 + 1)),
        active: false,
      });
    }
  }
  getDate() {
    this.setState((state) => {
      state.currentDate.setMinutes(new Date().getMinutes());
      return { currentDate: state.currentDate };
    });
  }
  componentDidMount() {
    this.oneMinuteCall = setInterval(() => this.getDate(), 60000);
  }
  componentWillUnmount() {
    clearInterval(this.oneMinuteCall);
  }

  onSingleCellSelection = (dayIndex) => {
    const days = this.state.days;
    days[dayIndex].active = true;
    this.setState({
      days,
    });
  };

  onMultiSelectionEnd = (selectionMode, selection) => {
    const days = this.state.days;
    for (const index in selection) {
      days[selection[index]].active = selectionMode === "select";
    }
    this.setState({ days });
  };

  renderCell = (day, cday) => (
    <TestDay currentDate={cday} cellsPerRow={8} {...day} />
  );
  changeDate = (n) => {
    this.setState(() => {
      this.state.currentDate.setDate(this.state.currentDate.getDate() + n);

      return this.state;
    });
  };

  generateMatrix(isDate) {
    var matrix = [];
    if (!isDate) {
      matrix = this.weekDays;
    } else {
      let todayDay = this.state.currentDate.getDay();
      matrix[todayDay] = this.state.currentDate.getDate();

      for (let i = todayDay - 1; i >= 0; i--) {
        this.state.tempDate.setMonth(this.state.currentDate.getMonth());
        this.state.tempDate.setDate(
          this.state.currentDate.getDate() - (todayDay - i)
        );
        matrix[i] = this.state.tempDate.getDate();
      }
      for (let i = todayDay + 1; i <= 6; i++) {
        this.state.tempDate.setMonth(this.state.currentDate.getMonth());
        this.state.tempDate.setDate(
          this.state.currentDate.getDate() + (i - todayDay)
        );
        matrix[i] = this.state.tempDate.getDate();
      }
    }
    return matrix;
  }

  render() {
    console.log("weekly render");
    const height = Dimensions.get("window").height;
    const width = Dimensions.get("window").width;

    var date = this.generateMatrix(1);
    var dates = [];
    dates = date.map((item, rowIndex) => {
      return (
        <View
          style={{
            flex: 0.5,
            flexDirection: "row",
            padding: 5,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              flex: 1,
              height: 20,
              textAlign: "center",
              // Highlight current date
              fontWeight:
                item == this.state.todayDate.getDate()
                  ? this.state.todayDate.getMonth() ==
                    this.state.currentDate.getMonth()
                    ? "bold"
                    : ""
                  : "",
            }}
          >
            {item}
          </Text>
        </View>
      );
    });

    var matrix = this.generateMatrix(0);
    var rows = [];
    rows = matrix.map((item, rowIndex) => {
      return (
        <View
          style={{
            flex: 0.5,
            flexDirection: "row",
            padding: 5,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              flex: 1,
              height: 20,
              textAlign: "center",
              color: rowIndex == 0 ? "#f00" : rowIndex == 6 ? "#00f" : "",
            }}
          >
            {item}
          </Text>
        </View>
      );
    });

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 0.8,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <PrevCalendarButton onPress={() => this.changeDate(-7)} />
          <DateCalendarText isMWD="W" currentDate={this.state.currentDate} />
          <NextCalendarButton onPress={() => this.changeDate(+7)} />
        </View>
        <View
          style={{
            flex: 0.5,
            flexDirection: "row",
            alignItmes: "center",
            justifyContent: "center",
            marginLeft: (width / 7.6) * 0.6,
          }}
        >
          {rows}
        </View>
        <View
          style={{
            flex: 0.5,
            flexDirection: "row",
            alignItmes: "center",
            justifyContent: "center",
            marginLeft: (width / 7.6) * 0.6,
          }}
        >
          {dates}
        </View>
        <View style={{ flex: 10 }}>
          <Test
            currentDate={this.state.currentDate}
            startselectValue={this.state.currentDate}
            endselectValue={this.state.currentDate}
            navigation={this.props.navigation}
            days={this.state.days}
            renderCell={this.renderCell}
            cellsPerRow={8}
            onSingleCellSelection={this.onSingleCellSelection}
            onMultiSelectionEnd={this.onMultiSelectionEnd}
          />
        </View>
      </View>
    );
  }
}
