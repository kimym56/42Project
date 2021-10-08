import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Switch,
  Text,
  TextInput,
  Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
//import Toast from "react-native-simple-toast";

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
  const [startDate, setStartDate] = useState(
    //new Date(props.route.params.startdateValue.setMinutes(0))
    new Date(props.route.params.startdateValue)
  );
  const [endDate, setEndDate] = useState(
    //new Date(props.route.params.enddateValue.setMinutes(0))
    new Date(props.route.params.enddateValue)
  );
  const [startDateVisible, setStartDateVisible] = useState(false);
  const [startTimeVisible, setStartTimeVisible] = useState(false);
  const [endDateVisible, setEndDateVisible] = useState(false);
  const [endTimeVisible, setEndTimeVisible] = useState(false);

  const showStartDatePicker = () => {
    setStartDateVisible(true);
  };
  const showStartTimePicker = () => {
    setStartTimeVisible(true);
  };
  const showEndDatePicker = () => {
    setEndDateVisible(true);
  };
  const showEndTimePicker = () => {
    setEndTimeVisible(true);
  };

  const [startDateText, onChangeSDText] = useState("");
  const [startTimeText, onChangeSTText] = useState("");
  const [endDateText, onChangeEDText] = useState("");
  const [endTimeText, onChangeETText] = useState("");

  const hideStartDatePicker = () => {
    setStartDateVisible(false);
  };
  const hideStartTimePicker = () => {
    setStartTimeVisible(false);
  };
  const hideEndDatePicker = () => {
    setEndDateVisible(false);
  };
  const hideEndTimePicker = () => {
    setEndTimeVisible(false);
  };

  const SDhandleConfirm = (date) => {
    hideStartDatePicker();
    setStartDate(date);
    onChangeSDText(date.format("yyyy/MM/dd"));
  };
  const SThandleConfirm = (date) => {
    hideStartTimePicker();
    setStartDate(date);
    onChangeSTText(date.format("a/p  hh:mm"));
  };
  const EDhandleConfirm = (date) => {
    hideEndDatePicker();
    setEndDate(date);
    onChangeEDText(date.format("yyyy/MM/dd"));
  };
  const EThandleConfirm = (date) => {
    hideEndTimePicker();
    setEndDate(date);
    onChangeETText(date.format("a/p  hh:mm"));
  };

  function isCorrect(n) {
    if (n == 1) {
      //Toast.show("Success");
      props.navigation.goBack();
    } else {
      Alert.alert("error");
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={{ color: "purple", flex: 0.5 }}>Start:</Text>
        <TouchableOpacity onPress={showStartDatePicker} style={{ flex: 1 }}>
          <TextInput
            pointerEvents="none"
            style={styles.textInput}
            placeholder={startDate.format("yyyy/MM/dd")}
            placeholderTextColor="#000000"
            underlineColorAndroid="transparent"
            editable={false}
            value={startDateText}
          />
          <DateTimePickerModal
            minimumDate={new Date()}
            date={startDate}
            isVisible={startDateVisible}
            mode="date"
            display={Platform.OS == "ios" ? "inline" : "default"}
            onConfirm={SDhandleConfirm}
            onCancel={hideStartDatePicker}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={showStartTimePicker}>
          <TextInput
            pointerEvents="none"
            style={styles.textInput}
            placeholder={startDate.format("a/p  hh:mm")}
            placeholderTextColor="#000000"
            underlineColorAndroid="transparent"
            editable={false}
            value={startTimeText}
          />
          <DateTimePickerModal
            date={startDate}
            isVisible={startTimeVisible}
            mode="time"
            display="spinner"
            onConfirm={SThandleConfirm}
            onCancel={hideStartTimePicker}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={{ color: "purple", flex: 0.5 }}>End:</Text>
        <TouchableOpacity onPress={showEndDatePicker} style={{ flex: 1 }}>
          <TextInput
            pointerEvents="none"
            style={styles.textInput}
            placeholder={endDate.format("yyyy/MM/dd")}
            placeholderTextColor="#000000"
            underlineColorAndroid="transparent"
            editable={false}
            value={endDateText}
          />
          <DateTimePickerModal
            minimumDate={startDate}
            date={endDate}
            isVisible={endDateVisible}
            mode="date"
            display={Platform.OS == "ios" ? "inline" : "default"}
            onConfirm={EDhandleConfirm}
            onCancel={hideEndDatePicker}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={showEndTimePicker}>
          <TextInput
            pointerEvents="none"
            style={styles.textInput}
            placeholder={endDate.format("a/p  hh:mm")}
            placeholderTextColor="#000000"
            underlineColorAndroid="transparent"
            editable={false}
            value={endTimeText}
          />
          <DateTimePickerModal
            date={endDate}
            isVisible={endTimeVisible}
            mode="time"
            display="spinner"
            onConfirm={EThandleConfirm}
            onCancel={hideEndTimePicker}
          />
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: "yellow", flex: 3 }}>
        <TextInput
          style={styles.input}
          placeholder="내용"
          //secureTextEntry={true}
          onChangeText={(contents) => setContents(contents)}
        />
      </View>
      <View style={{ backgroundColor: "skyblue", flex: 7 }}>
        {startDate.format("yyyyMMddHHmm") == endDate.format("yyyyMMddHHmm") && (
          <Text>same</Text>
        )}
        {startDate.format("yyyyMMddHHmm") != endDate.format("yyyyMMddHHmm") && (
          <Text>different</Text>
        )}
        <Button
          title={"AddEvent"}
          onPress={() => {
            isCorrect(
              startDate.format("yyyyMMddHHmm") <=
                endDate.format("yyyyMMddHHmm") && contents != ""
            );
          }}
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
