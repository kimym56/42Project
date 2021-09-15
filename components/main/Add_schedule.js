import React, { Component } from "react";
import { StyleSheet, View, Button, Text, TextInput } from "react-native";

export class Add_schedule extends Component {
  state = {
    schedule: "",
  };

  render() {
    return (
      <View>
        <Text>시작 시간:</Text>
        <Text>{this.props.route.params.dateValue.getMonth()}</Text>
        <Text>{this.props.route.params.dateValue.getDate()} </Text>
        <Text>{} </Text>
        <Text>끝 시간:</Text>

        <Text>내용:</Text>
        <TextInput
          style={style.input}
          placeholder="내용"
          //secureTextEntry={true}
          onChangeText={(schedule) => this.setState({ schedule })}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  input: {
    margin: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingHorizontal: 10,
    borderRadius: 3,
    borderColor: "gray",
    borderWidth: 2,
    padding: 10,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Add_schedule;
