import React, { useState, useRef } from "react";
import {
  View,
  FlatList,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

const LONG_PRESS_TIMEOUT = 200;

export default function TimeSlotSelector(props) {
  let [sub, setsub] = useState(0);
  const [beforeDate, setbeforeDate] = useState(new Date());
  let [afterDate, setafterDate] = useState(new Date());
  let [currentDate, setcurrentDate] = useState(
    props.currentDate ? new Date(props.currentDate) : new Date()
  );
  let [startselectDate, setstartselectDate] = useState(
    new Date(props.currentDate)
  );
  let [endselectDate, setendselectDate] = useState(new Date(props.currentDate));
  const [sequentialTouchnum, setsequentialTouchnum] = useState(0);
  const [sequentialTouchfromto, setsequentialTouchfromto] = useState([]);
  const [initialSelectedCellIndex, setinitialSelectedCellIndex] = useState(
    null
  );
  const [currentSelection, setcurrentSelection] = useState([]);
  const [cellLayout, setcellLayout] = useState({ height: 0, width: 0 });
  const [calendarLayout, setcalendarLayout] = useState({
    height: 0,
    width: 0,
  });
  const flatList = useRef(null);

  const goAddSchedule = () => {
    console.log("goAdd called");
    props.navigation.navigate("AddEvent2", {
      startdateValue: startselectDate,
      enddateValue: endselectDate,
    });
  };

  const changeToTimeFormat = (startIndex, endIndex) => {
    startselectDate = new Date(props.currentDate);
    endselectDate = new Date(props.currentDate);
    console.log(
      "inchangetotimeformat: ",
      startselectDate.getDate(),
      endselectDate.getDate(),
      "propsValue:",
      props.currentDate
    );
    const todayIndex = startselectDate.getDay();
    let startTimeIndex = startIndex;
    let endTimeIndex = endIndex;
    let toFirstStartIndex =
      startTimeIndex - (startTimeIndex % props.cellsPerRow); // 모두 첫번째 열 index로 변환 (0~7 => 0 and 8~15 => 8)
    let toFirstEndIndex = endTimeIndex - (endTimeIndex % props.cellsPerRow);

    if (props.cellsPerRow == 8) {
      // Weekly
      if (sub < 0) {
        // 역선택
        startselectDate.setHours(
          ((startTimeIndex % props.cellsPerRow) - 1 - todayIndex) * 24 +
            parseInt(toFirstStartIndex / (props.cellsPerRow * 2))
        ); // startTimeIndex % props.cellsPerRow : 모두 첫번째 행 index로 변환 (1,9,17... => 1 and 2,10,18... => 2)
        // -1 : 요일 index로 보정 (1~7 => 0~6)
        // -todayIndex : 선택 날짜 보정
        // parseInt(toFirstStartIndex / (props.cellsPerRow * 2)) : 0,0.5,1,1.5 ... => 0,0,1,1 ...
        // parseInt를 붙이는 조건 : () * 24가 0보다 작을 때
        if (toFirstEndIndex % (props.cellsPerRow * 2) != 0) {
          //0:30, 1:30, 2:30 ...
          endselectDate.setHours(
            ((endTimeIndex % props.cellsPerRow) - 1 - todayIndex - sub) * 24 +
              toFirstEndIndex / (props.cellsPerRow * 2) +
              1
          );
        } else {
          //0:00, 1:00, 2:00 ...
          endselectDate.setHours(
            ((endTimeIndex % props.cellsPerRow) - 1 - todayIndex - sub) * 24 +
              toFirstEndIndex / (props.cellsPerRow * 2)
          );
        }
      } else {
        //state.sub >=0
        startselectDate.setHours(
          ((startTimeIndex % props.cellsPerRow) - 1 - todayIndex - sub) * 24 +
            parseInt(toFirstStartIndex / (props.cellsPerRow * 2))
        );

        if (toFirstEndIndex % (props.cellsPerRow * 2) != 0) {
          endselectDate.setHours(
            ((endTimeIndex % props.cellsPerRow) - 1 - todayIndex) * 24 +
              parseInt(toFirstEndIndex / (props.cellsPerRow * 2)) +
              1
          );
        } else {
          endselectDate.setHours(
            ((endTimeIndex % props.cellsPerRow) - 1 - todayIndex) * 24 +
              parseInt(toFirstEndIndex / (props.cellsPerRow * 2))
          );
        }

        console.log(
          "sub>=0, startselectDate:",
          startselectDate,
          "endselectDate:",
          endselectDate
        );
      }
    } else {
      //Daily
      //cellsPerRow == 2

      if (sub < 0) {
        startselectDate.setHours(
          ((startTimeIndex % props.cellsPerRow) - 1) * 24 +
            toFirstStartIndex / (props.cellsPerRow * 2)
        );
        if (toFirstEndIndex % (props.cellsPerRow * 2) != 0) {
          endselectDate.setHours(
            ((endTimeIndex % props.cellsPerRow) - 1 - sub) * 24 +
              toFirstEndIndex / (props.cellsPerRow * 2) +
              1
          );
        } else {
          endselectDate.setHours(
            ((endTimeIndex % props.cellsPerRow) - 1 - sub) * 24 +
              toFirstEndIndex / (props.cellsPerRow * 2)
          );
        }
      } else {
        //state.sub >=0

        startselectDate.setHours(
          ((startTimeIndex % props.cellsPerRow) - 1 - sub) * 24 +
            parseInt(toFirstStartIndex / (props.cellsPerRow * 2))
        );
        if (toFirstEndIndex % (props.cellsPerRow * 2) != 0) {
          endselectDate.setHours(
            ((endTimeIndex % props.cellsPerRow) - 1) * 24 +
              toFirstEndIndex / (props.cellsPerRow * 2) +
              1
          );
        } else {
          endselectDate.setHours(
            ((endTimeIndex % props.cellsPerRow) - 1) * 24 +
              toFirstEndIndex / (props.cellsPerRow * 2)
          );
        }
      }
    }
    if (toFirstStartIndex % (props.cellsPerRow * 2) != 0) {
      startselectDate.setMinutes(30);
    } else {
      startselectDate.setMinutes(0);
    }
    if (toFirstEndIndex % (props.cellsPerRow * 2) == 0) {
      endselectDate.setMinutes(30);
    } else {
      endselectDate.setMinutes(0);
    }
  };
  const fillSpaceBtwStartAndEnd = (isDragging, startIndex, endIndex) => {
    let currentSelection = [];
    const start_x = (startIndex % props.cellsPerRow) + 1;
    const start_y = startIndex / props.cellsPerRow + 1;
    const end_x = (endIndex % props.cellsPerRow) + 1;
    const end_y = endIndex / props.cellsPerRow + 1;
    if (start_x == end_x) {
      for (let j = Math.floor(start_y); j <= Math.floor(end_y); j++) {
        isDragging
          ? currentSelection.push(props.cellsPerRow * (j - 1) + start_x - 1)
          : props.onSingleCellSelection(
              props.cellsPerRow * (j - 1) + start_x - 1
            );
      }
    } else {
      for (let j = Math.floor(start_y); j <= 48; j++) {
        isDragging
          ? currentSelection.push(props.cellsPerRow * (j - 1) + start_x - 1)
          : props.onSingleCellSelection(
              props.cellsPerRow * (j - 1) + start_x - 1
            );
      }
      for (let j = 1; j <= Math.floor(end_y); j++) {
        isDragging
          ? currentSelection.push(props.cellsPerRow * (j - 1) + end_x - 1)
          : props.onSingleCellSelection(
              props.cellsPerRow * (j - 1) + end_x - 1
            );
      }
      for (let i = start_x + 1; i <= end_x - 1; i++) {
        for (let j = 1; j <= 48; j++) {
          isDragging
            ? currentSelection.push(props.cellsPerRow * (j - 1) + i - 1)
            : props.onSingleCellSelection(props.cellsPerRow * (j - 1) + i - 1);
        }
      }
    }
    if (isDragging) {
      setcurrentSelection(currentSelection);
    }
  };
  const selectSingleCell = (cellIndex) => {
    console.log("props##:", props.currentDate.getDate());

    props.onSingleCellSelection(cellIndex);
    setsequentialTouchnum(sequentialTouchnum + 1);

    console.log("sequentialtouchnum: ", sequentialTouchnum);
    sequentialTouchfromto.push(cellIndex);
    if (sequentialTouchnum == 0) {
      setbeforeDate(new Date(currentDate));

      console.log("before: ", beforeDate.getDate());
    } else {
      afterDate = new Date(currentDate);
      console.log("after: ", afterDate.getDate());
      // 먼저 앞에 이른 시간을 선택하고 뒤에 나중 시간을 선택할 경우(반대의 경우는 안함)

      sub =
        afterDate.getDate() == beforeDate.getDate()
          ? 0
          : Math.round(
              (afterDate.getTime() - beforeDate.getTime()) /
                (1000 * 60 * 60 * 24)
            );
      console.log(
        "afterDate:",
        afterDate,
        "beforeDate:",
        beforeDate,
        "sub: ",
        sub
      );
    }
    if (sequentialTouchnum == 1) {
      let startIndex;
      let endIndex;
      if (sub == 0) {
        startIndex = Math.max(
          isTimeAearlierThanTimeB(
            sequentialTouchfromto[0],
            sequentialTouchfromto[1]
          )
            ? sequentialTouchfromto[0]
            : sequentialTouchfromto[1],
          0
        );
        endIndex = Math.min(
          isTimeAearlierThanTimeB(
            sequentialTouchfromto[0],
            sequentialTouchfromto[1]
          )
            ? sequentialTouchfromto[1]
            : sequentialTouchfromto[0],
          props.days.length - 1
        );
      } else if (sub > 0) {
        startIndex = sequentialTouchfromto[0];
        endIndex = sequentialTouchfromto[1];
      } else {
        // sub < 0
        startIndex = sequentialTouchfromto[1];
        endIndex = sequentialTouchfromto[0];
      }
      console.log("sti:", startIndex, "ei:", endIndex, "sub:", sub);

      changeToTimeFormat(startIndex, endIndex);
      fillSpaceBtwStartAndEnd(false, startIndex, endIndex);
      goAddSchedule();
      sequentialTouchfromto.pop();
      sequentialTouchfromto.pop();
      setsequentialTouchnum(0);
    }
  };

  const isTimeAearlierThanTimeB = (aTime, bTime) => {
    if (aTime % props.cellsPerRow < bTime % props.cellsPerRow) {
      return true;
    } else if (aTime % props.cellsPerRow > bTime % props.cellsPerRow) {
      return false;
    } else {
      if (aTime / props.cellsPerRow < bTime / props.cellsPerRow) {
        return true;
      } else {
        return false;
      }
    }
  };
  const onFirstcellLayout = ({
    nativeEvent: {
      layout: { width, height },
    },
  }) => {
    width = (Dimensions.get("window").width - width) / 7;

    setcellLayout({
      height,
      width,
    });
  };

  const isCellSelected = (index) =>
    currentSelection.includes(index) && multiSelectionMode === "select";

  const renderCell = ({ index, item }) => {
    item.selected = isCellSelected(index);
    if (index % props.cellsPerRow)
      return (
        <View style={{ flex: 1 }}>
          <TouchableWithoutFeedback
            onPress={() => {
              index % props.cellsPerRow ? selectSingleCell(index) : null;
            }}
            delayLongPress={LONG_PRESS_TIMEOUT}
            onLayout={index === 0 ? onFirstcellLayout : () => {}}
          >
            <View
              style={{
                flex: 1,
                backgroundColor:
                  currentDate.getFullYear() == new Date().getFullYear() &&
                  currentDate.getMonth() == new Date().getMonth() &&
                  currentDate.getDate() == new Date().getDate() &&
                  (props.cellsPerRow == 8
                    ? index % props.cellsPerRow == new Date().getDay() + 1
                    : true)
                    ? "rgba(0,0,0,0.1)"
                    : "white",
              }}
              pointerEvents="box-only"
            >
              {props.renderCell(item, currentDate)}
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    else {
      if (props.cellsPerRow == 8) {
        //weekly time format
        return (
          <TouchableWithoutFeedback
            onLayout={index === 0 ? onFirstcellLayout : () => {}}
          >
            <View
              style={{ flex: 0.6, backgroundColor: "white" }}
              pointerEvents="box-only"
            >
              {props.renderCell(item)}
            </View>
          </TouchableWithoutFeedback>
        );
      } else {
        return (
          //daily time format
          <TouchableWithoutFeedback
            onLayout={index === 0 ? onFirstcellLayout : () => {}}
          >
            <View
              style={{ flex: 0.08, backgroundColor: "white" }}
              pointerEvents="box-only"
            >
              {props.renderCell(item)}
            </View>
          </TouchableWithoutFeedback>
        );
      }
    }
  };

  const onCalendarLayout = ({
    nativeEvent: {
      layout: { x, y, width, height },
    },
  }) => {
    setcalendarLayout({
      height,
      width,
    });
  };

  currentDate = props.currentDate ? new Date(props.currentDate) : new Date();
  const { days, cellsPerRow } = props;
  const renderedCells = days;
  console.log("functional render");
  return (
    <View>
      <FlatList
        ref={() => flatList}
        onLayout={() => {
          onCalendarLayout;
        }}
        data={renderedCells}
        renderItem={renderCell}
        numColumns={cellsPerRow}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={initialSelectedCellIndex === null}
        maxToRenderPerBatch={30}
        initialNumToRender={160}
        getItemLayout={(data, index) => ({
          length: 32,
          offset: 32 * index,
          index,
        })}
        initialScrollIndex={new Date().getHours() * 2}
        lagacyImplementation={true}
        refreshing={true}
      />
    </View>
  );
}
