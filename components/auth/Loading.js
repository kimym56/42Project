import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { render } from "react-dom";

export default class Loading extends Component {
  render() {
    return (
      <ImageBackground
        source={require("../../logo.jpg")}
        style={{ width: "100%", height: "100%" }}
      />
    );
  }
}
