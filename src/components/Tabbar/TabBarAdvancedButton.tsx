import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { TabBg } from "./TabBg";

type Props = BottomTabBarButtonProps & {
  bgColor?: string;
};

export const TabBarAdvancedButton: React.FC<Props> = ({
  bgColor,
  ...props
}) => (
  <View style={styles.container} pointerEvents="box-none">
    <TabBg color={bgColor} style={styles.background} />
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Icon name="plus" style={styles.buttonIcon} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    position: "relative",
    width: 140,
    height: 70,
    alignItems: "center",
  },
  background: {
    position: "absolute",
    
    top: 0,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 48,
    height: 48,
    borderRadius: 27,
    backgroundColor: "#E94F37",
  },
  buttonIcon: {
    fontSize: 16,
    color: "#F6F7EB",
  },
});
