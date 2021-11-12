import React, { PureComponent } from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { render } from "react-dom";

export default class Loading extends PureComponent {
  render() {
    return (
      <ImageBackground
        source={require("../assets/images/logo.jpg")}
        style={{ width: "100%", height: "100%" }}
      />
    );
  }
}
