import React, { Component, PureComponent } from "react";
import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import Test from "./api/FunctionalTest.js";
import TestDay from "./api/TimeSlotCell.js";
export default class Weekly extends Component {
  weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  state = {
    days: [],
    currentDate: new Date(),
    todayDate: new Date(),
    tempDate: new Date(),
    //beforeDate: new Date(),
    //afterDate: new Date(),
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
  getDate() {
    this.setState((state) => {
      state.currentDate.setMinutes(new Date().getMinutes())
      return {currentDate : state.currentDate}
  })
  };
  componentDidMount() {
    this.oneMinuteCall = setInterval(() => this.getDate(), 60000);
  }
  componentWillUnmount() {
    clearInterval(this.oneMinuteCall);
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

  renderCell = (day, cday) => <TestDay currentDate={cday} {...day} />;
  changeDate = (n) => {
    this.setState(() => {
      this.state.currentDate.setDate(this.state.currentDate.getDate() + n);

      return this.state;
    });
  };

  generateMatrix(isDate) {
    var matrix = [];
    //matrix[0] = this.state.currentDate.getDate();
    if (!isDate) {
      matrix[0] = "Sun";
      matrix[1] = "Mon";
      matrix[2] = "Tue";
      matrix[3] = "Wed";
      matrix[4] = "Thu";
      matrix[5] = "Fri";
      matrix[6] = "Sat";
    } else {
      let todayDay = this.state.currentDate.getDay();
      matrix[todayDay] = this.state.currentDate.getDate();

      for (let i = todayDay - 1; i >= 0; i--) {
        //matrix[i] = matrix[i + 1] - 1;
        this.state.tempDate.setMonth(this.state.currentDate.getMonth());
        this.state.tempDate.setDate(
          this.state.currentDate.getDate() - (todayDay - i)
        );
        //console.log('index:',i,'tempdate',tempDate)
        matrix[i] = this.state.tempDate.getDate();
      }
      for (let i = todayDay + 1; i <= 6; i++) {
        //matrix[i] = matrix[i - 1] + 1;
        this.state.tempDate.setMonth(this.state.currentDate.getMonth());
        this.state.tempDate.setDate(
          this.state.currentDate.getDate() + (i - todayDay)
        );
        matrix[i] = this.state.tempDate.getDate();
      }
    }

    return matrix;
  }

  render() {
    console.log('weekly render')
    const height = Dimensions.get("window").height;
    const width = Dimensions.get("window").width;
    //console.log("size: ", height, width);
    /*
    const renderItem = useCallback((day, cday) => (
      <TestDay currentDate={cday} {...day} />
    ));*/

    var date = this.generateMatrix(1);
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
              //color: rowIndex == 0 ? "#f00" : rowIndex == 6 ? "#00f" : "",
              // Highlight current date
              fontWeight:
                item == this.state.todayDate.getDate()
                  ? this.state.todayDate.getMonth() ==
                    this.state.currentDate.getMonth()
                    ? "bold"
                    : ""
                  : "",
            }}
            //onPress={() => this._onPress(item)}
          >
            {item}
          </Text>
        </View>
      );
    });

    var matrix = this.generateMatrix(0);
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
            //backgroundColor: "red",
            marginLeft: (width / 7.6) * 0.6,
          }}
        >
          {dates}
        </View>
        <View style={{ flex: 10 }}>
          <Test
            currentDate={this.state.currentDate}
            startselectValue={this.state.currentDate}
            endselectValue={this.state.currentDate}
            navigation={this.props.navigation}
            days={this.state.days}
            renderCell={this.renderCell}
            cellsPerRow={8}
            //renderCell={renderItem}
            onSingleCellSelection={this.onSingleCellSelection}
            onMultiSelectionEnd={this.onMultiSelectionEnd}
          />
        </View>
      </View>
    );
  }
}
