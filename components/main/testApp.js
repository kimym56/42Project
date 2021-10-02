// @flow

import React, { Component } from "react";
import { View } from "react-native";
import Test from "./testCalendar";
import TestDay from "./testDay";
export default class App extends Component {
  state = {
    days: [],
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

  render() {
    return (
      <Test
        navigation={this.props.navigation}
        days={this.state.days}
        renderCell={this.renderCell}
        onSingleCellSelection={this.onSingleCellSelection}
        onMultiSelectionEnd={this.onMultiSelectionEnd}
      />
    );
  }
}
