import React from "react";
import { View, Button } from "react-native";
export default function Landing({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
      <Button title="home" onPress={() => navigation.navigate("home")} />
      <Button title="TabNav" onPress={() => navigation.navigate("TabNav")} />
    
    </View>
  );
}
