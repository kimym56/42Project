// @flow

import React, { Component } from "react";
import { View, StyleSheet, Button, TouchableOpacity, Text } from "react-native";
import Test from "./api/TimeSlotSelector.js";
import TestDay from "./api/TimeSlotCell.js";
export default class Weekly extends Component {
  weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  state = {
    days: [],
    currentDate: new Date(),
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
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItmes: "center",
            justifyContent: "center",
            backgroundColor: "red",
          }}
        >
          <TouchableOpacity
            title="Previous"
            onPress={() => this.changeDate(-7)}
            style={{ flex: 1, backgroundColor: "blue" }}
            underlayColor="#fff"
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              Previous
            </Text>
          </TouchableOpacity>
          <Text style={{ textAlign: "center", flex: 1 }}>
            {this.state.currentDate.getMonth() + 1} &nbsp;
            {this.state.currentDate.getDate()} &nbsp;
            {this.weekDays[this.state.currentDate.getDay()]}
          </Text>
          <TouchableOpacity
            title="Next"
            onPress={() => this.changeDate(+7)}
            style={{ flex: 1, backgroundColor: "blue" }}
            underlayColor="#fff"
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 10 }}>
          <Test
            startselectValue={this.state.currentDate}
            endselectValue={this.state.currentDate}
            navigation={this.props.navigation}
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
