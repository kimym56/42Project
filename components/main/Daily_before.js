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