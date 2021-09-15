import React, { Component } from "react";
import { View, Button, Text } from "react-native";

export class Daily extends Component {
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  state = {
    activeDate: new Date(),
    selectDate: new Date(),
  };
  generateMatrix() {
    var matrix = [];
    // Create header
    matrix[0] = this.weekDays;

    // More code here
    var year = this.state.activeDate.getFullYear();
    var month = this.state.activeDate.getMonth();
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
  /*
  _onPress = (item) => {
    this.setState(() => {
      if (!item.match && item != -1) {
        this.state.activeDate.setDate(item);

        return this.state;
      }
    });
  };
  */

  _onPress2 = (item) => {
    this.setState(() => {
      this.state.selectDate.setDate(item);
      return this.state;
    });
  };

  changeMonth = (n) => {
    this.setState(() => {
      this.state.activeDate.setMonth(this.state.activeDate.getMonth() + n);
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

              //fontWeight: item == this.state.activeDate.getDate() ? "bold" : "",
              color: item == this.state.activeDate.getDate() ? "green" : "blue",

              fontWeight: item == this.state.selectDate.getDate() ? "bold" : "",
            }}
            //onPress={() => this._onPress(item)}
            onPress={() => {
              this._onPress2(item),
                alert(item)
                //alert(this.state.activeDate.getDate());
            }}
          >
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
          {this.months[this.state.activeDate.getMonth()]} &nbsp;
          {this.state.activeDate.getFullYear()}
        </Text>
        {rows}
      </View>
    );
  }
}
export default Daily;

/*
export class Daily extends Component {
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  state = {
    activeDate: new Date(),
  };
  setMonth = (month) => {
    let monthNo = this.months.indexOf(month); // get month number
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("month", monthNo); // change month value
    this.setState({
      dateObject: dateObject, // add to state
    });
  };
  changeMonth = (n) => {
    this.setState(() => {
      this.state.activeDate.setMonth(this.state.activeDate.getMonth() + n);
      return this.state;
    });
  };
  generateMatrix() {
    var matrix = [];
    // Create header
    matrix[0] = this.weekDays;

    // More code here
    var year = this.state.activeDate.getFullYear();
    var month = this.state.activeDate.getMonth();
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
  render() {
    var year = this.state.activeDate.getFullYear();
    var month = this.state.activeDate.getMonth();
    var firstDay = new Date(year, month, 1).getDay();
    var maxDays = this.nDays[month];
    if (month == 1) {
      // February
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        maxDays += 1;
      }
    }
    var rows = [];
    var matrix = this.generateMatrix();
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
              fontWeight: item == this.state.activeDate.getDate() ? "bold" : "",
            }}
            onPress={() => this._onPress(item)}
          >
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
    props.data.map((data) => {
      months.push(
        <td
          key={data}
          className="calendar-month"
          onClick={(e) => {
            this.setMonth(data);
          }}
        >
          <span>{data}</span>
        </td>
      );
    });
    return (
      <View>
        <Button title="Previous" onPress={() => this.changeMonth(-1)} />
        <Button title="Next" onPress={() => this.changeMonth(+1)} />
      </View>
    );
  }
}
export default Daily;
*/
