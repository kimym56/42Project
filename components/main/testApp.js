// @flow

import React, { Component } from "react";

import Test from "./testCalendar";
import TestDay from "./testDay";


export default class App extends Component {
  state = {
    days: []
  };

  componentWillMount() {
    for (let i = 1; i <= 357; i++) {
      this.state.days.push({ id: i, number: i, active: Math.random() >= 0.5 });
    }
  }

  onSingleCellSelection = (dayIndex) => {
    const days = this.state.days;
    days[dayIndex].active = !days[dayIndex].active;
    this.setState({
      days
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
        days={this.state.days}
        renderCell={this.renderCell}
        onSingleCellSelection={this.onSingleCellSelection}
        onMultiSelectionEnd={this.onMultiSelectionEnd}
      />
    );
  }
}