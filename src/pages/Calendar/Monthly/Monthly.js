import React, { Component } from "react";
import { View, Text, TouchableOpacity, Touchable } from "react-native";

import PrevCalendarButton from "components/Buttons/PrevCalendarButton";
import NextCalendarButton from "components/Buttons/NextCalendarButton";
import DateCalendarText from "components/Texts/DateCalendarText";
import Calendar from "..";

import { useSelector, useDispatch } from "react-redux";
import { changeStartdate, changeEnddate } from "../../../rdx/index";


export default function Monthly(props) {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
  const activeDate = new Date();
  const selectDate = useSelector((state) => state.dateReducer.startDate);
  console.log("SelectDate : ",selectDate);
  const dispatch = useDispatch();
  
  const generateMatrix = () => {
    const matrix = [];
    //matrix[0] = this.weekDays;

    //var year = this.state.selectDate.getFullYear();
    //var month = this.state.selectDate.getMonth();
    //var firstDay = new Date(year, month, 1).getDay();

    const year = selectDate.getFullYear();
    const month = selectDate.getMonth();
    const firstDay = selectDate.getDay();
    console.log("SelectDate : ",selectDate);
    const maxDays = nDays[month];
    if (month == 1) {
      // February
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        maxDays += 1;
      }
    }
    let counter = 1;
    for (let row = 1; row < 7; row++) {
      matrix[row] = [];
      if (counter > maxDays) {
        break;
      }
      for (let col = 0; col < 7; col++) {
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
  };
  const _onPress2 = (item) => {
   
      //this.state.selectDate.setDate(item);

      const date = new Date(selectDate.setDate(item));
      dispatch(changeStartdate(date));
      dispatch(changeEnddate(date))
      goAddSchedule();
   
  };

  const changeMonth = (n) => {
   
      //this.state.selectDate.setMonth(this.state.selectDate.getMonth() + n);
      const date = new Date(
        selectDate.setMonth(selectDate.getMonth() + n)
      );
      dispatch(changeStartdate(date));
      //return this.state;
      return selectDate;
  
  };
  const goAddSchedule = () => {
    props.navigation.navigate("AddEvent2", {
      //startdateValue: this.state.selectDate,
      //enddateValue: this.state.selectDate,

    });
  };

  
    console.log("monthly render");
    const matrix = generateMatrix();
    const dayMatrix = weekDays;
    let days = [];
    days = dayMatrix.map((item, rowIndex) => {
      return (
        <View
          style={{
            flex: 0.5,
            flexDirection: "row",
            padding: 0,
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "white",
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

    let rows = [];
    rows = matrix.map((row, rowIndex) => {
      const rowItems = row.map((item, colIndex) => {
        return (
          <TouchableOpacity
            style={{ flex: 1, borderWidth: 1, flexDirection: "row" }}
          >
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
                  item == activeDate.getDate() &&
                  activeDate.getMonth() == selectDate.getMonth()
                    ? "blue"
                    : "black",

                fontWeight:
                  item == activeDate.getDate() &&
                  activeDate.getMonth() == selectDate.getMonth()
                    ? "bold"
                    : "",
              }}
              onPress={() => {
                if (item != -1) {
                  _onPress2(item);
                }
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
        <View style={{ flex: 0.8, flexDirection: "row" }}>
          <PrevCalendarButton onPress={() => changeMonth(-1)} />
          <DateCalendarText isMWD="M" selectDate={selectDate} />
          <NextCalendarButton onPress={() => changeMonth(+1)} />
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
        <View style={{ flex: 11, backgroundColor: "white" }}>{rows}</View>
      </View>
    );
  
  //render 끝나는 부분

}
