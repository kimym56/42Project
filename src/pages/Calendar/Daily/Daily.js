import React, { Component } from "react";
import { View, StyleSheet, Button, TouchableOpacity, Text } from "react-native";
import Test from "components/TimeSlot/TimeSlotSelector.js";
import TestDay from "components/TimeSlot/TimeSlotCell.js";

import PrevCalendarButton from "components/Buttons/PrevCalendarButton";
import NextCalendarButton from "components/Buttons/NextCalendarButton";
import DateCalendarText from "components/Texts/DateCalendarText";
export default class Daily extends Component {
  weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  state = {
    days: [],
    currentDate: new Date(),
  };

  componentWillMount() {
    for (let i = 0; i < 96; i++) {
      this.state.days.push({
        id: Math.floor(48 * (i % 2) + (i / 2 + 1)),
        number: Math.floor(48 * (i % 2) + (i / 2 + 1)),
        active: false,
      });
    }
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
    <TestDay cellsPerRow={2} currentDate={cday} {...day} />
  );

  changeDate = (n) => {
    this.setState(() => {
      this.state.currentDate.setDate(this.state.currentDate.getDate() + n);

      return this.state;
    });
  };

  render() {
    console.log("daily render");
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 0.8,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <PrevCalendarButton onPress={() => this.changeDate(-1)} />
          <DateCalendarText isMWD="D" currentDate={this.state.currentDate} />
          <NextCalendarButton onPress={() => this.changeDate(+1)} />
        </View>
        <View style={{ flex: 11 }}>
          <Test
            currentDate={this.state.currentDate}
            startselectValue={this.state.currentDate}
            endselectValue={this.state.currentDate}
            navigation={this.props.navigation}
            cellsPerRow={2}
            days={this.state.days}
            renderCell={this.renderCell}
            onSingleCellSelection={this.onSingleCellSelection}
            onMultiSelectionEnd={this.onMultiSelectionEnd}
          />
        </View>
      </View>
    );
  }
}
