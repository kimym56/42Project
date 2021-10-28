import React, { useCallback, useState, useEffect, useRef } from "react";
import {
  View,
  FlatList,
  TouchableWithoutFeedback,
  Vibration,
  ScrollView,
  Dimensions,
  Button,
  Platform,
} from "react-native";

const LONG_PRESS_TIMEOUT = 200;
const VIBRATION_DURATION = 300;
const SCROLL_INCREMENTATION = 15;
const DISTANCE_BEFORE_MANUAL_SCROLL = 50;

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
  const [initialSelectedCellIndex, setinitialSelectedCellIndex] =
    useState(null);
  const [currentSelection, setcurrentSelection] = useState([]);
  const [cellLayout, setcellLayout] = useState({ height: 0, width: 0 });
  const [calendarLayout, setcalendarLayout] = useState({
    height: 0,
    width: 0,
  });
  const [scrollOffset, setscrollOffset] = useState(0);
  const [maxScrollOffset, setmaxScrollOffset] = useState(1000);

  const flatList = useRef(null);

  /*
  useEffect(() => {
    console.log("stn", sequentialTouchnum);
  }, [sequentialTouchnum]);
*/
  //const [flatList, setflatList] = useState();
  const callbacktest = useCallback(() => {
    //index % props.cellsPerRow ? selectSingleCell(index) : null;
    selectSingleCell(4);
  }, []);

  const goAddSchedule = () => {
    console.log("goAdd called");
    props.navigation.navigate("AddEvent2", {
      startdateValue: startselectDate,
      enddateValue: endselectDate,
    });
  };

  const changeToTimeFormat = (startIndex, endIndex) => {
    startselectDate = new Date(props.startselectValue);
    endselectDate = new Date(props.endselectValue);
    console.log(
      "inchangetotimeformat: ",
      startselectDate.getDate(),
      endselectDate.getDate(),
      "propsValue:",
      props.startselectValue,
      props.endselectValue
    );
    const todayIndex = startselectDate.getDay();
    //console.log("todayIndex: ", todayIndex);

    let startTimeIndex = startIndex;
    let endTimeIndex = endIndex;
    let toFirstStartIndex =
      startTimeIndex - (startTimeIndex % props.cellsPerRow); // 모두 첫번째 열 index로 변환 (0~7 => 0 and 8~15 => 8)
    let toFirstEndIndex = endTimeIndex - (endTimeIndex % props.cellsPerRow);
    //currentDate = props.currentDate ? new Date(props.currentDate) : new Date();
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

        //console.log(state.startselectDate);
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
    //console.log(startIndex, endIndex);

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
    /*if (cellIndex % props.cellsPerRow == 0) {
      return;
    }*/
    console.log(
      "props##:",
      props.startselectValue.getDate(),
      props.endselectValue.getDate()
    );

    props.onSingleCellSelection(cellIndex);
    setsequentialTouchnum(sequentialTouchnum + 1);

    console.log("sequentialtouchnum: ", sequentialTouchnum);
    //console.log("sss: ", sequentialTouchnum);
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
      /*start = Math.min(
        state.sequentialTouchfromto[0],
        state.sequentialTouchfromto[1]
      );
      end = Math.max(
        state.sequentialTouchfromto[0],
        state.sequentialTouchfromto[1]
      );*/
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
      /*for (let i = start + 1; i <= end - 1; i++) {
        props.onSingleCellSelection(i);
      }*/
      fillSpaceBtwStartAndEnd(false, startIndex, endIndex);
      goAddSchedule();
      sequentialTouchfromto.pop();
      sequentialTouchfromto.pop();
      setsequentialTouchnum(0);
    }
  };
  const dateDiff = (_date1, _date2) => {
    var diffDate_1 = new Date(_date1);
    var diffDate_2 = new Date(_date2);

    diffDate_1 = new Date(
      diffDate_1.getFullYear(),
      diffDate_1.getMonth(),
      diffDate_1.getDate()
    );
    diffDate_2 = new Date(
      diffDate_2.getFullYear(),
      diffDate_2.getMonth(),
      diffDate_2.getDate()
    );
    console.log("imhere", "1: ", diffDate_1, "@@@2: ", diffDate_2);
    var diff = diffDate_2.getTime() - diffDate_1.getTime();
    diff = Math.ceil(diff / (1000 * 3600 * 24));

    return diff;
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
    //item.deselected = isCellDeselected(index);

    if (index % props.cellsPerRow)
      return (
        <View style={{ flex: 1 }}>
          <TouchableWithoutFeedback
            //onPress={callbacktest}

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
                  index % props.cellsPerRow == new Date().getDay() + 1
                    ? "silver"
                    : "skyblue",
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
        return (
          <TouchableWithoutFeedback
            onLayout={index === 0 ? onFirstcellLayout : () => {}}
          >
            <View
              style={{ flex: 0.6, backgroundColor: "skyblue" }}
              pointerEvents="box-only"
            >
              {props.renderCell(item)}
            </View>
          </TouchableWithoutFeedback>
        );
      } else {
        return (
          <TouchableWithoutFeedback
            onLayout={index === 0 ? onFirstcellLayout : () => {}}
          >
            <View
              style={{ flex: 0.08, backgroundColor: "skyblue" }}
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

  const onScroll = (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const maxScrollOffset = contentSize.height - layoutMeasurement.height;
    //console.log('conoff:',contentOffset.y,'max:',maxScrollOffset,'cs:',contentSize,'lm:',layoutMeasurement)
    //setState({ maxScrollOffset, scrollOffset: contentOffset.y });
    setmaxScrollOffset(maxScrollOffset);
    setscrollOffset(contentOffset.y);
  };

  //console.log("selector render");
  currentDate = props.currentDate ? new Date(props.currentDate) : new Date();

  //console.log("render date:", state.currentDate.getDate());
  const { days, cellsPerRow } = props;
  const renderedCells = days;

  //Flatlist optimization
  /*
    const keyExtractor = useCallback((item) => item.id.toString(), []);
    const getItemLayout = useCallback(
      (data, index) => ({ length: 32, offset: 32 * index, index }),
      []
    );*/
  console.log("functional render");
  return (
    <View>
      <FlatList
        ref={() => flatList}
        onLayout={() => {
          onCalendarLayout;
        }}
        data={renderedCells}
        onScroll={() => {
          onScroll;
        }}
        renderItem={renderCell}
        numColumns={cellsPerRow}
        keyExtractor={(item) => item.id.toString()}
        //keyExtractor={keyExtractor}
        scrollEnabled={initialSelectedCellIndex === null}
        maxToRenderPerBatch={30}
        //updateCellsBatchingPeriod={10}
        initialNumToRender={160}
        getItemLayout={(data, index) => ({
          length: 32,
          offset: 32 * index,
          index,
        })}
        initialScrollIndex={new Date().getHours() * 2}
        lagacyImplementation={true}
        refreshing={true}
        //contentContainerStyle={{ paddingBottom: 180 }}
      />
    </View>
  );
}
