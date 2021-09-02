import React, { Component } from "react";
import { StyleSheet, View, Button, TextInput,ScrollView } from "react-native";
import CalendarCarousel from './CalendarCarousel';


export class Daily extends Component {

  render() {
    return (
        <ScrollView horizontal>
    <CalendarCarousel
      date={new Date()}
      
    />
  </ScrollView>

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

export default Daily;
