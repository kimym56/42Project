import React, { Component,useState,useEffect } from "react";
import { View, Text, TouchableOpacity, Touchable } from "react-native";
import { Iconoir } from "iconoir-react";
import Icon from "react-native-vector-icons/FontAwesome";
import PrevCalendarButton from "components/Buttons/PrevCalendarButton";
import NextCalendarButton from "components/Buttons/NextCalendarButton";
import DateCalendarText from "components/Texts/DateCalendarText";
import Calendar from "..";
import { useSelector, useDispatch } from "react-redux";
import { changeMonthlyCurrentDate } from "../../../rdx";

import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Monthly(props) {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const activeDate = new Date();
  const selectDate = useSelector((state) => {
    return state.dateReducer.monthlyDate;
  });
  const [newState, setnewState] = useState("");
  async function getData() {
    try {
      const mystate = await AsyncStorage.getItem("@diary:state");
      console.log('getData : ', mystate)
      if (mystate !== null) {
        setnewState(JSON.parse(mystate));
      }
    } catch (e) {}
  }
  useEffect(() => {
    getData()
    console.log('newState: ', newState)
  },[selectDate])
  let events = [
    {startDate : '2022-3-11T13:24:00', endDate : '2022-03-11T17:24:00', contents: 'E1'},
    {startDate : '2022-3-12T14:25:00', endDate : '2022-03-12T18:25:00', contents: 'E2'},
    {startDate : '2022-3-13T15:26:00', endDate : '2022-03-13T19:26:00', contents: 'E3'},
  ]
  const getEvent = (date)=>{
    // console.log('date in getEvent: ', date)
    let result = events.filter(it => it.startDate.includes(date));
    console.log(result[0]?result[0].contents:'');
    return result[0]?result[0].contents:'';
  }
  const dispatch = useDispatch();
  const generateMatrix = () => {
    var matrix = [];
    //matrix[0] = this.weekDays;
    // console.log("333333333", selectDate);
    var year = selectDate.getFullYear();
    var month = selectDate.getMonth();
    var firstDay = new Date(year, month, 1).getDay();
    // console.log("firstDay:", firstDay);
    var maxDays = nDays[month];
    if (month == 1) {
      // February
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        maxDays += 1;
      }
    }
    var counter = 1;
    for (var row = 1; row < 7; row++) {
      matrix[row] = [];
      if (counter > maxDays) {
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
  };
  const _onPress2 = (item) => {
    /*
    this.setState(() => {
      this.state.selectDate.setDate(item);
      this.goAddSchedule();
    });
    */
    dispatch(changeMonthlyCurrentDate(new Date(selectDate.setDate(item))));
    goAddSchedule();
  };
  const _onPressEvent = (item) => {
    props.navigation.navigate("EventDetail", {
      date: item,
    });
  };
  const changeMonth = (n) => {
    /*
    this.setState(() => {
      this.state.selectDate.setMonth(this.state.selectDate.getMonth() + n);
      return this.state;
    });
    */
    const newDate = selectDate.setMonth(selectDate.getMonth() + n);
    dispatch(changeMonthlyCurrentDate(new Date(newDate)));
  };

  const goAddSchedule = () => {
    props.navigation.navigate("AddEvent2", {
      startdateValue: selectDate,
      enddateValue: selectDate,
    });
  };
  console.log("monthly render");
  
  var matrix = generateMatrix();
  var dayMatrix = weekDays;
  var days = [];
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
            fontFamily: "Pridi-Light",
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
  let tempDate = selectDate;
  tempDate.setDate(1);
  let finalLineIndex = Math.ceil(
    (nDays[tempDate.getMonth()] - 7 + tempDate.getDay()) / 7 + 1
  );
  rows = matrix.map((row, rowIndex) => {
    var rowItems = row.map((item, colIndex) => {
      // console.log(item, nDays[selectDate.getMonth()]);
      // if (item == nDays[selectDate.getMonth()]) {
      //   finalLineIndex = rowIndex;
      //   // console.log("UUUUUU", rowIndex);
      // }
      let date = selectDate.getFullYear()+'-'+(selectDate.getMonth()+1)+'-'+item;
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: "column",
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.1)",
            //borderRightWidth: 0,
            // borderBottomWidth: 0,
            borderRightWidth: colIndex == 6 ? 1 : 0,

            borderBottomWidth: rowIndex == finalLineIndex ? 1 : 0,
            borderTopLeftRadius: colIndex == 0 && rowIndex == 1 ? 10 : 0,
            borderTopRightRadius: colIndex == 6 && rowIndex == 1 ? 10 : 0,
            borderBottomLeftRadius:
              colIndex == 0 && rowIndex == finalLineIndex ? 10 : 0,
            borderBottomRightRadius:
              colIndex == 6 && rowIndex == finalLineIndex ? 10 : 0,
            backgroundColor: "white",
          }}
          onPress={() => {
            // if-else문으로 _onPress2와 _onPressEvent 구별해야됨 !!!!! (22.01.15)
            // localData 이후에 처리
            if (item != -1) {
              _onPress2(item);
            }
          }}
        >
          <Text
            style={{
              fontFamily: "Pridi-ExtraLight",
              fontSize: 18,
              flex: 1,
              textAlign: "center",
              // Highlight header
              // backgroundColor: rowIndex == 0 ? "#ddd" : "#fff",
              // Highlight Sundays
              color:
                colIndex == 0
                  ? "#a00"
                  : item == activeDate.getDate() &&
                    activeDate.getMonth() == selectDate.getMonth()
                  ? "blue"
                  : "black",
              // Highlight current date
              /*
              color:
                item == activeDate.getDate() &&
                activeDate.getMonth() == selectDate.getMonth()
                  ? "blue"
                  : "black",
              */
              fontWeight:
                item == activeDate.getDate() &&
                activeDate.getMonth() == selectDate.getMonth()
                  ? "bold"
                  : "",
            }}
          >
            {item != -1 ? item : ""}
            {/* {finalLineIndex} */}
          </Text>
          <Text style={{ flex: 1 }}>
            {getEvent(date)}</Text>
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
          // borderBottomWidth: rowIndex == finalLineIndex ? 1 : 0,
          // borderBottomLeftRadius : rowIndex == finalLineIndex ? 10 : 0,
          // borderBottomRightRadius : rowIndex == finalLineIndex ? 10 : 0,
          // // borderWidth:2
        }}
      >
        {rowItems}
      </View>
    );
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#F2F3F5" }}>
      <View
        style={{
          flex: 0.8,
          flexDirection: "row",
          borderBottomWidth: 1,
          borderColor: "rgba(0,0,0,0.1)",
          backgroundColor: "white",
        }}
      >
        <PrevCalendarButton onPress={() => changeMonth(-1)} />
        <DateCalendarText isMWD="M" />
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
      <View style={{ flex: 11 }}>{rows}</View>
      <View style={{ flex: 0.5 }} />
    </View>
  );

  //render 끝나는 부분
}
//export default Monthly;
