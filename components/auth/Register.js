import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TextInput, Button } from "react-native";
import DatePicker from "react-native-datepicker";
import { render } from "react-dom";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { date: "2020-08-12" };
  }
  render() {
    return (
      <View style={style.container}>
        <Image source={require("../../logo.jpg")} style={style.logo} />
        <TextInput
          style={style.input}
          placeholder="이메일 주소"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          style={style.input}
          placeholder="비밀번호"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />
        <TextInput
          style={style.input}
          placeholder="이름"
          onChangeText={(name) => this.setState({ name })}
        />
        <DatePicker
          placeholder="생년월일"
          date={this.state.date}
          mode="time"
          format="YYYY-MM-DD"
          minDate="1900-01-01"
          maxDate="2020-12-31"
          confirmBtnText="confirm"
          cancelBtnText="cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              right: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            this.setState({ date: date });
          }}
        />

        <Button onPress={() => this.onSignUp()} title="Sign Up" />
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
  logo: {
    width: 200,
    height: 200,
  },
});
