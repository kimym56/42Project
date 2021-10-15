import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
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

  generateMatrix() {
    var matrix = [];

    //matrix[0] = this.state.currentDate.getDate();

    //var counter = 0;

    /*
    for (var i = 1; i < 8; i++) {
      matrix[i] = counter++;
    }
    */
    matrix[1] = "Sun";
    matrix[2] = "Mon";
    matrix[3] = "Tue";
    matrix[4] = "Wed";
    matrix[5] = "Thu";
    matrix[6] = "Fri";
    matrix[7] = "Sat";

    return matrix;
  }
  render() {
    const height = Dimensions.get("window").height;
    const width = Dimensions.get("window").width;
    //console.log("size: ", height, width);

    var matrix = this.generateMatrix();
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
              height: 15,
              textAlign: "center",
              color: rowIndex == 1 ? "#f00" : rowIndex == 7 ? "#00f" : "",

              // Highlight header
              //backgroundColor: rowIndex == 1 ? "#f00" : "#000"
              // Highlight Sundays
              // Highlight current date
              //fontWeight: item == this.state.activeDate.getDate() ? "bold" : "",
            }}
            //onPress={() => this._onPress(item)}
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
        <View
          style={{
            flex: 0.5,
            flexDirection: "row",
            alignItmes: "center",
            justifyContent: "center",
            //backgroundColor: "red",
            marginLeft: width / 8,
          }}
        >
          {rows}
        </View>

        {/*
        <View
          style={{
            flex: 0.5,
            flexDirection: "row",
            alignItmes: "center",
            justifyContent: "center",
            //backgroundColor: "red",
            marginLeft: width / 8,
          }}
        >
          <Text
            style={{
              color: "#f00",
              textAlign: "right",
              marginLeft: width / 32,
              marginRight: width / 32,
            }}
          >
            Sun
          </Text>
          <Text
            style={{
              textAlign: "right",
              marginLeft: width / 32,
              marginRight: width / 32,
            }}
          >
            Mon
          </Text>
          <Text
            style={{
              textAlign: "right",
              marginLeft: width / 32,
              marginRight: width / 32,
            }}
          >
            Tue
          </Text>
          <Text
            style={{
              textAlign: "right",
              marginLeft: width / 32,
              marginRight: width / 32,
            }}
          >
            Wed
          </Text>
          <Text
            style={{
              textAlign: "right",
              marginLeft: width / 32,
              marginRight: width / 32,
            }}
          >
            Thu
          </Text>
          <Text
            style={{
              textAlign: "right",
              marginLeft: width / 32,
              marginRight: width / 32,
            }}
          >
            Fri
          </Text>
          <Text
            style={{
              textAlign: "right",
              marginLeft: width / 32,
              marginRight: width / 32,
            }}
          >
            Sat
          </Text>
        </View>
          */}
        <View style={{ flex: 10 }}>
          <Test
            currentDate={this.state.currentDate}
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
