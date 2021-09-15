import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Button, Text} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AddEvent() {
  const [date, setDate] = useState(new Date());

  const [date2, setDate2] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };
  const onChange2 = (event2, selectedDate2) => {
    const currentDate2 = selectedDate2 || date2;
    setShow(Platform.OS === "ios");
    setDate(currentDate2);
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
    <View> 
      <View>
        <Text style={{ color: "purple" }}>Start:</Text>
        <View style={styles.container}>
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
    flex: 1,
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
});
