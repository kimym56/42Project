import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Switch,
  Text,
  TextInput,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
Date.prototype.format = function (f) {
  if (!this.valueOf()) return " ";

  var weekName = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  var d = this;

  return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
    switch ($1) {
      case "yyyy":
        return d.getFullYear();
      case "yy":
        return (d.getFullYear() % 1000).zf(2);
      case "MM":
        return (d.getMonth() + 1).zf(2);
      case "dd":
        return d.getDate().zf(2);
      case "E":
        return weekName[d.getDay()];
      case "HH":
        return d.getHours().zf(2);
      case "hh":
        return (d.getHours() % 12 ? d.getHours() % 12 : 12).zf(2);
      case "mm":
        return d.getMinutes().zf(2);
      case "ss":
        return d.getSeconds().zf(2);
      case "a/p":
        return d.getHours() < 12 ? "오전" : "오후";
      default:
        return $1;
    }
  });
};
String.prototype.string = function (len) {
  var s = "",
    i = 0;
  while (i++ < len) {
    s += this;
  }
  return s;
};
String.prototype.zf = function (len) {
  return "0".string(len - this.length) + this;
};
Number.prototype.zf = function (len) {
  return this.toString().zf(len);
};

export default function AddEvent(props) {
  const [contents, setContents] = useState("");
  const [date, setDate] = useState(
    new Date(props.route.params.dateValue.setMinutes(0))
  );
  const [date2, setDate2] = useState(
    new Date(props.route.params.dateValue.setMinutes(0))
  );
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };

  const [text, onChangeText] = useState("");

  const [text2, onChangeText2] = useState("");
  const placeholder = "날짜를 입력해주세요";

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };


  const handleConfirm = (date) => {
    //console.warn("dateFormat: ", date.format("yyyy/MM/dd"));
    hideDatePicker();
    setDate(date);
    onChangeText(date.format("yyyy/MM/dd"));
  };
  const handleConfirm2 = (date) => {
    console.warn("timeFormat: ", date.format("a/p  hh:mm"));
    hideDatePicker2();
    onChangeText2(date.format("a/p  hh:mm"));
    setDate(date);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };
  const onChange2 = (event2, selectedDate2) => {
    const currentDate2 = selectedDate2 || date2;
    setDate2(currentDate2);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  return (
    <View style={{ flex: 1 }}>
      {/* 
      <View>
        <Text>시작 시간:</Text>
        <Text>{props.route.params.dateValue.getMonth()}</Text>
        <Text>{props.route.params.dateValue.getDate()} </Text>
        <Text>{} </Text>
        <Text>끝 시간:</Text>

        <Text>내용:</Text>
        <TextInput
          style={styles.input}
          placeholder="내용"
          //secureTextEntry={true}
          onChangeText={(contents) => setContents(contents)}
        />
      </View>
      */}
      <View style={styles.container}>
        <Text style={{ color: "purple", flex: 1 }}>Start:</Text>
      </View>
      <View style={styles.container}>
        <Text style={{ color: "purple", flex: 0.5 }}>End:</Text>

        {/*{show && (
          <DateTimePicker
            style={styles.item2}
            testID="dateTimePicker"
            value={date2}
            mode={"time"}
            is24Hour={true}
            display="spinner"
            onChange={onChange2}
          />
        )}
        <Button
          title="bb"
          onPress={() => {
            setShow(true);
          }}
        />*/}
        <TouchableOpacity onPress={showDatePicker} style={{ flex: 1 }}>
          <TextInput
            pointerEvents="none"
            style={styles.textInput}
            placeholder={date.format("yyyy/MM/dd")}
            placeholderTextColor="#000000"
            underlineColorAndroid="transparent"
            editable={false}
            value={text}
          />
          <DateTimePickerModal
            date={date}
            isVisible={isDatePickerVisible}
            mode="date"
            display="inline"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={showDatePicker2}>
        <TextInput
          pointerEvents="none"
          style={styles.textInput}
          placeholder={date.format("hh/mm a/p")}
          placeholderTextColor="#000000"
          underlineColorAndroid="transparent"
          editable={false}
          value={text2}
        />
        <DateTimePickerModal
          date={date}
          isVisible={isDatePickerVisible2}
          mode="time"
          display="spinner"
          onConfirm={handleConfirm2}
          onCancel={hideDatePicker2}
        />
      </TouchableOpacity>

      </View>
      <View style={{ backgroundColor: "yellow", flex: 10 }}>
        <TextInput
          style={styles.input}
          placeholder="내용"
          //secureTextEntry={true}
          onChangeText={(contents) => setContents(contents)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  item1: {
    flex: 2,
    backgroundColor: "red",
  },
  item2: {
    flex: 2,
    backgroundColor: "green",
  },
  item3: {
    flex: 1,
    backgroundColor: "blue",
  },
  input: {
    flex: 0.5,
    margin: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingHorizontal: 10,
    borderRadius: 3,
    borderColor: "gray",
    borderWidth: 2,
    padding: 10,
  },
  textInput: {
    fontSize: 16,
    color: "#000000",
    height: 50,
    width: "100%",
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
  },
});
