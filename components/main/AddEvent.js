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
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AddEvent(props) {
  const [contents, setContents] = useState("");
  
  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
    
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

        <DateTimePicker
          style={styles.item1}
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={false}
          display="compact"
          onChange={onChange}
        />

        <DateTimePicker
          style={styles.item2}
          testID="dateTimePicker"
          value={date}
          mode={"time"}
          is24Hour={true}
          display="inline"
          onChange={onChange}
        />
      </View>
      <View style={styles.container}>
        <Text style={{ color: "purple", flex: 1 }}>End:</Text>

        <DateTimePicker
          style={styles.item1}
          testID="dateTimePicker"
          value={date2}
          mode={"date"}
          is24Hour={false}
          display="compact"
          onChange={onChange2}
        />

        <DateTimePicker
          style={styles.item2}
          testID="dateTimePicker"
          value={date2}
          mode={"time"}
          is24Hour={true}
          display="inline"
          onChange={onChange2}
        />
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
    flex:0.5,
    margin: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingHorizontal: 10,
    borderRadius: 3,
    borderColor: "gray",
    borderWidth: 2,
    padding: 10,
  },
});
