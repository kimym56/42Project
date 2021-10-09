// @flow

import React, { Component } from "react";
import { View, StyleSheet, Button, TouchableOpacity, Text } from "react-native";
import Test from "./api/TimeSlotSelector.js";
import TestDay from "./api/TimeSlotCell.js";
export default class Daily extends Component {
  weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  state = {
    days: [],
    currentDate: new Date(),
  };
  componentWillMount() {
    for (let i = 1; i <= 48; i++) {
      this.state.days.push({ id: i, number: i, active: false });
    }
  }

  onSingleCellSelection = (dayIndex) => {
    const days = this.state.days;
    //days[dayIndex].active = !days[dayIndex].active;
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

  renderCell = (day) => <TestDay {...day} />;
  changeDate = (n) => {
    this.setState(() => {
      this.state.currentDate.setDate(this.state.currentDate.getDate() + n);

      return this.state;
    });
  };
  render() {
    return (
      <View>
        <Button title="Previous" onPress={() => this.changeDate(-1)} />
        <Text>
          {this.state.currentDate.getMonth() + 1} &nbsp;
          {this.state.currentDate.getDate()} &nbsp;
          {this.weekDays[this.state.currentDate.getDay()]}
        </Text>
        <Button title="Next" onPress={() => this.changeDate(+1)} />
        <Test
          startselectValue={this.state.currentDate}
          endselectValue={this.state.currentDate}
          navigation={this.props.navigation}
          cellsPerRow={1}
          days={this.state.days}
          renderCell={this.renderCell}
          onSingleCellSelection={this.onSingleCellSelection}
          onMultiSelectionEnd={this.onMultiSelectionEnd}
        />
      </View>
    );
  }
}