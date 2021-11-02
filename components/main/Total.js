import React, { useState } from "react";
import { View, Image, Dimensions } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
export default function Total() {
  const [data, setData] = useState([
    {
      name: "banana",
      id: "1",
      source: require("./img/1.png"),
    },
    {
      name: "china",
      id: "2",
      source: require("./img/2.png"),
    },
    {
      name: "halloween",
      id: "3",
      source: require("./img/5.png"),
    },
    {
      name: "mawin",
      id: "4",
      source: require("./img/4.png"),
    },
    {
      name: "sunglasses",
      id: "5",
      source: require("./img/6.png"),
    },
    // and so on...
  ]);
  console.log(data[1])
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity>
          <Image
            style={{ width: Dimensions.get("window").width / 3 }}
            source={item.source}
          />
        </TouchableOpacity>
      )}
      keyExtractor={(item) => String(item.id)}
      numColumns={3}
    />
  );
}
