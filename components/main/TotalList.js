import React, { useState } from "react";
import { View, FlatList, Image, Dimensions, Text, Button } from "react-native";
export default function TotalList(props) {
  const [startIndex, setstartIndex] = useState(props.route.params.startIndex);
  const [endIndex, setendIndex] = useState(props.route.params.endIndex);
  const [data, setData] = useState(
    props.route.params.item.slice(startIndex - 1, endIndex)
  );

  console.log(data);
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <View
          style={{ borderWidth: 5, borderColor: "skyblue", marginBottom: 10 }}
        >
          <Text>이름</Text>
          <Text>날짜</Text>
          <Image
            style={{ width: Dimensions.get("window").width }}
            source={item.source}
          />
          <Text>{(item.name, item.id)}</Text>
          <Button title="신고하기"></Button>
        </View>
      )}
      keyExtractor={(item) => String(item.id)}
      numColumns={1}
      //initialScrollIndex={index}
    />
  );
}
