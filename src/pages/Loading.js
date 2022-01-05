import React, { PureComponent } from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { render } from "react-dom";

export default class Loading extends PureComponent {
  render() {
    return (
      <View style={{  justifyContent: "center",
      alignItems: "center",
      height: "100%",backgroundColor:'white'}}>
        <Image
          source={require("../assets/images/logo3.png")}
          style={{
            width: "100%",
            height: 100, alignSelf: "center"
          }}
        />
      </View>
    );
  }
}
