import React, { Component } from "react";
import { View, Text, TouchableOpacity, Touchable } from "react-native";

import PrevCalendarButton from "components/Buttons/PrevCalendarButton";
import NextCalendarButton from "components/Buttons/NextCalendarButton";
import DateCalendarText from "components/Texts/DateCalendarText"
import Calendar from "..";
export class Monthly extends Component {

  weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  state = {
    activeDate: new Date(),
    selectDate: new Date(),
  };
  generateMatrix() {
    var matrix = [];
    //matrix[0] = this.weekDays;

    var year = this.state.selectDate.getFullYear();
    var month = this.state.selectDate.getMonth();
    var firstDay = new Date(year, month, 1).getDay();
    var maxDays = this.nDays[month];
    if (month == 1) {
      // February
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        maxDays += 1;
      }
    }
    var counter = 1;
    for (var row = 1; row < 7; row++) {
      matrix[row] = [];
      if (counter>maxDays){
        break;
      }
      for (var col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if (row == 1 && col >= firstDay) {
          // Fill in rows only after the first day of the month
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          // Fill in rows only if the counter's not greater than
          // the number of days in the month
          matrix[row][col] = counter++;
          
        }
        
      }
      
    }
    return matrix;
  }
  _onPress2 = (item) => {
    this.setState(() => {
      this.state.selectDate.setDate(item);
     this.goAddSchedule();
    });
  };

  changeMonth = (n) => {
    this.setState(() => {
       this.state.selectDate.setMonth(this.state.selectDate.getMonth() + n);
      return this.state;
    });
  };

  render() {
    console.log("monthly render");
    var matrix = this.generateMatrix();
    var dayMatrix=this.weekDays;
var days=[];
days = dayMatrix.map((item, rowIndex) => {
  return (
    <View
      style={{
        flex: 0.5,
        flexDirection: "row",
        padding: 0,
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "white" 
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

    var rows = [];
    rows = matrix.map((row, rowIndex) => {
      var rowItems = row.map((item, colIndex) => {
        return (<TouchableOpacity style={{flex:1,borderWidth:1,
        flexDirection: "row"}}>
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              // Highlight header
              backgroundColor: rowIndex == 0 ? "#ddd" : "#fff",
 
              // Highlight Sundays
              color: colIndex == 0 ? "#a00" : "#000",
              // Highlight current date

              color:
                item == this.state.activeDate.getDate() &&
                this.state.activeDate.getMonth() ==
                  this.state.selectDate.getMonth()
                  ? "blue"
                  : "black",

              fontWeight:
                item == this.state.activeDate.getDate() &&
                this.state.activeDate.getMonth() ==
                  this.state.selectDate.getMonth()
                  ? "bold"
                  : "",
            }}
            
            onPress={() => {
              if (item!=-1){
              this._onPress2(item);}
            }}
          >
            {item != -1 ? item : ""}
          </Text>
          </TouchableOpacity>
        );
      });
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            padding: 0,
            justifyContent: "space-around",
          }}
        >
          {rowItems}
        </View>
      );
    });

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.8 ,flexDirection: "row", }}>
          <PrevCalendarButton onPress={() => this.changeMonth(-1)} />
          <DateCalendarText isMWD = "M" selectDate={this.state.selectDate} />
          <NextCalendarButton onPress={() => this.changeMonth(+1)} />
      
        </View>
        <View
          style={{
            flex: 0.5,
            flexDirection: "row",
            alignItmes: "center",
            justifyContent: "center",
            //marginLeft: (width / 7.6) * 0.6,
          }}
        >
          {days}
        </View>
        <View style={{flex:11,backgroundColor:'white'}}>{rows}</View>
        
      </View>
    );
  }
  //render 끝나는 부분
  goAddSchedule() {
    this.props.navigation.navigate("AddEvent2", {
      startdateValue: this.state.selectDate,
      enddateValue: this.state.selectDate,
    });
  }
}
export default Monthly;