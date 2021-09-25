import React, { Component } from "react";
import { View, Button, Text } from "react-native";
import WeekView from "react-native-week-view";
import Draggable from "react-native-draggable";

export class Weekly extends Component {
  render() {
    const myEvents = [
      {
        id: 1,
        description: "Event",
        startDate: new Date(2021, 8, 25, 12, 0),
        endDate: new Date(2021, 8, 25, 12, 30),
        color: "blue",
        // ... more properties if needed,
      },
      // More events...
    ];
    return (
      <Draggable>
        <WeekView
          events={myEvents}
          selectedDate={new Date()}
          numberOfDays={5}
        />
      </Draggable>
    );
  }
}
export default Weekly;
