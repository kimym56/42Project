import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
} from "react-native";

import Test from "components/TimeSlot/TimeSlotSelector.js";
import TestDay from "components/TimeSlot/TimeSlotCell.js";
import PrevCalendarButton from "components/Buttons/PrevCalendarButton";
import NextCalendarButton from "components/Buttons/NextCalendarButton";
import DateCalendarText from "components/Texts/DateCalendarText";

import { useSelector, useDispatch } from "react-redux";
import { changeStartdate, changeEnddate } from "../../../rdx/index";
import { changeCurrentdate} from "../../../rdx/index";

export default function Weekly(props) {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  /*
  state = {
    days: [],
    currentDate: new Date(),
    todayDate: new Date(),
    tempDate: new Date(),
  };
  */
 let days=[];
 const currentDate=useSelector((state)=>state.dateReducer.currentDate)
 const todayDate=new Date()
 //tempDate는 props로 안넘기고, weekly 내에서만 하기때문에 redux로 안넘김
 //const [tempDate, setTempDate]=useState(new Date())
 let tempDate=new Date()
const dispatch=useDispatch();

  
    for (let i = 0; i < 384; i++) {
      days.push({
        id: Math.floor(48 * (i % 8) + (i / 8 + 1)),
        number: Math.floor(48 * (i % 8) + (i / 8 + 1)),
        active: false,
      });
    }
  
  const getDate=()=> {
    /*
    this.setState((state) => {
      state.currentDate.setMinutes(new Date().getMinutes());
      return { currentDate: state.currentDate };
    });
    */
   const date=new Date(currentDate.setMinutes(new Date().getMinutes()))
    dispatch(changeCurrentdate(date))
      //return { currentDate: state.currentDate };
  }
  // componentDidMount=()=> {  // 1분마다 갱신
  //   oneMinuteCall = setInterval(() => getDate(), 60000);
  // }
  // componentWillUnmount=()=> {
  //   clearInterval(oneMinuteCall);
  // }

  const onSingleCellSelection = (dayIndex) => {
    //const days = days;
    days[dayIndex].active = true;
    /*
    this.setState({
      days,
    });
    */
  };

  const onMultiSelectionEnd = (selectionMode, selection) => {
    //const days = days;
    for (const index in selection) {
      days[selection[index]].active = selectionMode === "select";
    }
    //this.setState({ days });
  };

  const renderCell = (day, cday) => (
    <TestDay currentDate={cday} cellsPerRow={8} {...day} />
  );
  const changeDate = (n) => {
    /*
    this.setState(() => {
      this.state.currentDate.setDate(this.state.currentDate.getDate() + n);

      return this.state;
    });
*/
    const date=new Date(currentDate.setDate(currentDate.getDate() + n))
    dispatch(changeCurrentdate(date))
  };

  const generateMatrix=(isDate)=> {
    var matrix = [];
    if (!isDate) {
      matrix = weekDays;
    } else {
      let todayDay =currentDate.getDay();
      matrix[todayDay] = currentDate.getDate();

      for (let i = todayDay - 1; i >= 0; i--) {
        tempDate.setMonth(currentDate.getMonth());
        tempDate.setDate(
          currentDate.getDate() - (todayDay - i)
        );
        matrix[i] = tempDate.getDate();
      }
      for (let i = todayDay + 1; i <= 6; i++) {
        tempDate.setMonth(currentDate.getMonth());
        tempDate.setDate(
          currentDate.getDate() + (i - todayDay)
        );
        matrix[i] = tempDate.getDate();
      }
    }
    return matrix;
  }

  
    console.log("weekly render");
    const height = Dimensions.get("window").height;
    const width = Dimensions.get("window").width;

    var date = generateMatrix(1);
    var dates = [];
    dates = date.map((item, rowIndex) => {
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
              height: 20,
              textAlign: "center",
              // Highlight current date
              fontWeight:
                item == todayDate.getDate()
                  ? todayDate.getMonth() ==
                    currentDate.getMonth()
                    ? "bold"
                    : ""
                  : "",
            }}
          >
            {item}
          </Text>
        </View>
      );
    });

    var matrix =generateMatrix(0);
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

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 0.8,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <PrevCalendarButton onPress={() => changeDate(-7)} />
          <DateCalendarText isMWD="W" currentDate={currentDate} />
          <NextCalendarButton onPress={() => changeDate(+7)} />
        </View>
        <View
          style={{
            flex: 0.5,
            flexDirection: "row",
            alignItmes: "center",
            justifyContent: "center",
            marginLeft: (width / 7.6) * 0.6,
          }}
        >
          {rows}
        </View>
        <View
          style={{
            flex: 0.5,
            flexDirection: "row",
            alignItmes: "center",
            justifyContent: "center",
            marginLeft: (width / 7.6) * 0.6,
          }}
        >
          {dates}
        </View>
        <View style={{ flex: 10 }}>
          <Test
            currentDate={currentDate}
            startselectValue={currentDate}
            endselectValue={currentDate}
            navigation={props.navigation}
            days={days}
            renderCell={renderCell}
            cellsPerRow={8}
            onSingleCellSelection={onSingleCellSelection}
            onMultiSelectionEnd={onMultiSelectionEnd}
          />
        </View>
      </View>
    );
  
}
