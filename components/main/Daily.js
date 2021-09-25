import React, { Component } from "react";
import { View, Button, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export class Daily extends Component {
  state = {
    currentDate: new Date(),
  };
  weekDays = ["Today Date"];
  generateMatrix() {
    var matrix = [];
    // Create header
    //matrix[0] = this.state.currentDate.getDate();
    matrix[0] = this.state.currentDate.getDate();

    // More code here
    //var year = this.state.currentDate.getFullYear();
    //var month = this.state.currentDate.getMonth();

    var counter = 0;
    for (var i = 1; i < 25; i++) {
      matrix[i] = counter++;
    }
    return matrix;
  }

  changeMonth = (n) => {
    this.setState(() => {
      //this.state.activeDate.setMonth(this.state.activeDate.getMonth() + n);
      this.state.currentDate.setDate(this.state.currentDate.getDate() + n);
      return this.state;
    });
  };

  render() {
    var matrix = this.generateMatrix();
    var rows = [];
    rows = matrix.map((item, rowIndex) => {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            padding: 15,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              flex: 1,
              height: 18,
              textAlign: "center",
              // Highlight header
              //backgroundColor: rowIndex == 0 ? "#ddd" : "#fff",
              // Highlight Sundays

              // Highlight current date

              //fontWeight: item == this.state.activeDate.getDate() ? "bold" : "",
            }}
            //onPress={() => this._onPress(item)}

            onPress={() => {
              //this._onPress2(item);
              //alert(item),
              //alert(this.state.activeDate.getDate());
            }}
          >
            {console.log(item)}
            {item}
          </Text>
        </View>
      );
    });

    return (
      <ScrollView>
        <Button title="Previous" onPress={() => this.changeMonth(-1)} />
        <Button title="Next" onPress={() => this.changeMonth(+1)} />

        {rows}
      </ScrollView>
    );
  }
}
export default Daily;

/*
export class Daily extends Component {
  state = {
    currentDate: new Date(),
  };
  weekDays = ["Today Date"];
  generateMatrix() {
    var matrix = [];
    // Create header
    //matrix[0] = this.state.currentDate.getDate();
    matrix[0] = this.weekDays;

    // More code here
    //var year = this.state.currentDate.getFullYear();
    //var month = this.state.currentDate.getMonth();

    var counter = 1;
    for (var row = 1; row < 2; row++) {
      matrix[row] = [];
      for (var col = 0; col < 24; col++) {
        matrix[row][col] = counter++;
      }
    }
    return matrix;
  }

  changeMonth = (n) => {
    this.setState(() => {
      //this.state.activeDate.setMonth(this.state.activeDate.getMonth() + n);
      this.state.currentDate.setDate(this.state.currentDate.getDate() + n);
      return this.state;
    });
  };

  render() {
    var matrix = this.generateMatrix();

    var rows = [];
    rows = matrix.map((row, rowIndex) => {
      var rowItems = row.map((item, colIndex) => {
        return (
          <Text
            style={{
              flex: 1,
              height: 18,
              textAlign: "center",
              // Highlight header
              backgroundColor: rowIndex == 0 ? "#ddd" : "#fff",
              // Highlight Sundays
              color: colIndex == 0 ? "#a00" : "#000",
              // Highlight current date
            }}
            //onPress={() => this._onPress(item)}

            onPress={() => {
              //this._onPress2(item);
              //alert(item),
              //alert(this.state.activeDate.getDate());
            }}
          >
            {console.log(item)}
            {item != -1 ? item : ""}
          </Text>
        );
      });
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            padding: 15,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {rowItems}
        </View>
      );
    });
    return (
      <View>
        <Button title="Previous" onPress={() => this.changeMonth(-1)} />
        <Button title="Next" onPress={() => this.changeMonth(+1)} />

        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            textAlign: "center",
          }}
        >
          {this.state.currentDate.getMonth()}
          {this.state.currentDate.getDate()}
          {this.state.currentDate.getDay()}
          {this.state.currentDate.getFullYear()}
        </Text>
        {rows}
      </View>
    );
  }
}
export default Daily;
*/
