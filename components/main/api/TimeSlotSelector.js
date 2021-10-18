import React, { Component } from "react";
import {
  View,
  FlatList,
  TouchableWithoutFeedback,
  PanResponder,
  Vibration,
  ScrollView,
} from "react-native";

const LONG_PRESS_TIMEOUT = 200;
const VIBRATION_DURATION = 300;
const SCROLL_INCREMENTATION = 10;
const DISTANCE_BEFORE_MANUAL_SCROLL = 50;
export default class Test extends Component {
  panResponder;
  flatList;

  static defaultProps = {
    cellsPerRow: 8,
  };

  state = {
    sub: 0,
    styleToday: 0,
    testScroll: 0,
    beforeDate: new Date(),
    afterDate: new Date(),
    currentDate: this.props.currentDate
      ? new Date(this.props.currentDate)
      : new Date(),
    startselectDate: new Date(this.props.currentDate),
    endselectDate: new Date(this.props.currentDate),
    sequentialTouchnum: 0,
    sequentialTouchfromto: [],
    multiSelectionMode: null,
    initialSelectedCellIndex: null,
    currentSelection: [],
    cellLayout: {
      height: 0,
      width: 0,
    },
    calendarLayout: {
      height: 0,
      width: 0,
    },
    shouldScrollUp: false,
    shouldScrollDown: false,
    scrollOffset: 0,
    maxScrollOffset: 1000,
  };
  goAddSchedule() {
    this.props.navigation.navigate("AddEvent2", {
      startdateValue: this.state.startselectDate,
      enddateValue: this.state.endselectDate,
    });
  }

  componentDidUpdate() {
    const { shouldScrollUp, shouldScrollDown, scrollOffset, maxScrollOffset } =
      this.state;

    if (shouldScrollUp) {
      this.flatList.scrollToOffset({
        offset: Math.max(scrollOffset - SCROLL_INCREMENTATION, 0),
        animated: false,
      });

      this.state.testScroll = Math.max(scrollOffset - SCROLL_INCREMENTATION, 0);
    } else if (shouldScrollDown) {
      const scrollOffsetValue = scrollOffset + SCROLL_INCREMENTATION;

      //console.log("scroll: ", scrollOffsetValue);

      this.flatList.scrollToOffset({
        offset: scrollOffsetValue,
        animated: false,
      });

      this.state.testScroll = scrollOffsetValue;
    } else {
      this.state.testScroll = 0;
    }
  }

  isCellActive = (cellIndex) => this.props.days[cellIndex].active;

  startMultiSelection = (cellIndex) => {
    /*if (cellIndex % this.props.cellsPerRow == 0) {
      return;
    }*/
    const isCellAlreadyActive = this.isCellActive(cellIndex);
    this.setState({
      multiSelectionMode: "select", //취소 기능 코드 multiSelectionMode: isCellAlreadyActive ? "deselect" : "select"
      initialSelectedCellIndex: cellIndex,
    });

    Vibration.vibrate(VIBRATION_DURATION);
  };
  /*
  changetoLayoutTime = (i) => {
    let hour = 0;
    let minute = 0;
    if (parseInt(i / 2) == 0) {
      hour = 12;
    } else {
      hour = parseInt(i / 2);
    }
    if (i % 2 == 1) {
      minute = 30;
    } else {
      minute = 0;
    }
    return String("0" + hour).slice(-2) + ":" + String("0" + minute).slice(-2);
  };
*/
  changeToTimeFormat = (startIndex, endIndex) => {
    console.log(
      "inchangetotimeformat: ",
      this.state.startselectDate.getDate(),
      this.state.endselectDate.getDate()
    );
    this.state.startselectDate = new Date(this.props.startselectValue);
    this.state.endselectDate = new Date(this.props.endselectValue);

    const todayIndex = this.state.startselectDate.getDay();
    //console.log("todayIndex: ", todayIndex);

    let startTimeIndex = startIndex;
    let endTimeIndex = endIndex;
    let toFirstStartIndex =
      startTimeIndex - (startTimeIndex % this.props.cellsPerRow);
    let toFirstEndIndex =
      endTimeIndex - (endTimeIndex % this.props.cellsPerRow);
    if (this.props.cellsPerRow == 8) {
      this.state.startselectDate.setHours(
        ((startTimeIndex % this.props.cellsPerRow) -
          1 -
          todayIndex -
          this.state.sub) *
          24 +
          toFirstStartIndex / (this.props.cellsPerRow * 2)
      );
      //console.log(this.state.startselectDate);
      if (toFirstEndIndex % (this.props.cellsPerRow * 2) != 0) {
        this.state.endselectDate.setHours(
          ((endTimeIndex % this.props.cellsPerRow) - 1 - todayIndex) * 24 +
            toFirstEndIndex / (this.props.cellsPerRow * 2) +
            1
        );
      } else {
        this.state.endselectDate.setHours(
          ((endTimeIndex % this.props.cellsPerRow) - 1 - todayIndex) * 24 +
            toFirstEndIndex / (this.props.cellsPerRow * 2)
        );
      }
    } else {
      //cellsPerRow == 2
      this.state.startselectDate.setHours(
        ((startTimeIndex % this.props.cellsPerRow) - 1 - this.state.sub) * 24 +
          toFirstStartIndex / (this.props.cellsPerRow * 2)
      );
      //console.log(this.state.startselectDate);
      if (toFirstEndIndex % (this.props.cellsPerRow * 2) != 0) {
        this.state.endselectDate.setHours(
          ((endTimeIndex % this.props.cellsPerRow) - 1) * 24 +
            toFirstEndIndex / (this.props.cellsPerRow * 2) +
            1
        );
      } else {
        this.state.endselectDate.setHours(
          ((endTimeIndex % this.props.cellsPerRow) - 1) * 24 +
            toFirstEndIndex / (this.props.cellsPerRow * 2)
        );
      }
    }
    //console.log(startIndex, endIndex);

    if (toFirstStartIndex % (this.props.cellsPerRow * 2) != 0) {
      this.state.startselectDate.setMinutes(30);
    } else {
      this.state.startselectDate.setMinutes(0);
    }
    if (toFirstEndIndex % (this.props.cellsPerRow * 2) == 0) {
      this.state.endselectDate.setMinutes(30);
    } else {
      this.state.endselectDate.setMinutes(0);
    }
  };
  fillSpaceBtwStartAndEnd = (isDragging, startIndex, endIndex) => {
    let currentSelection = [];
    const start_x = (startIndex % this.props.cellsPerRow) + 1;
    const start_y = startIndex / this.props.cellsPerRow + 1;
    const end_x = (endIndex % this.props.cellsPerRow) + 1;
    const end_y = endIndex / this.props.cellsPerRow + 1;
    if (start_x == end_x) {
      for (let j = Math.floor(start_y); j <= Math.floor(end_y); j++) {
        isDragging
          ? currentSelection.push(
              this.props.cellsPerRow * (j - 1) + start_x - 1
            )
          : this.props.onSingleCellSelection(
              this.props.cellsPerRow * (j - 1) + start_x - 1
            );
      }
    } else {
      for (let j = Math.floor(start_y); j <= 48; j++) {
        isDragging
          ? currentSelection.push(
              this.props.cellsPerRow * (j - 1) + start_x - 1
            )
          : this.props.onSingleCellSelection(
              this.props.cellsPerRow * (j - 1) + start_x - 1
            );
      }
      for (let j = 1; j <= Math.floor(end_y); j++) {
        isDragging
          ? currentSelection.push(this.props.cellsPerRow * (j - 1) + end_x - 1)
          : this.props.onSingleCellSelection(
              this.props.cellsPerRow * (j - 1) + end_x - 1
            );
      }
      for (let i = start_x + 1; i <= end_x - 1; i++) {
        for (let j = 1; j <= 48; j++) {
          isDragging
            ? currentSelection.push(this.props.cellsPerRow * (j - 1) + i - 1)
            : this.props.onSingleCellSelection(
                this.props.cellsPerRow * (j - 1) + i - 1
              );
        }
      }
    }
    if (isDragging) {
      this.setState({ currentSelection });
    }
  };
  selectSingleCell = (cellIndex) => {
    /*if (cellIndex % this.props.cellsPerRow == 0) {
      return;
    }*/
    console.log(
      "props##:",
      this.props.startselectValue.getDate(),
      this.props.endselectValue.getDate()
    );

    this.props.onSingleCellSelection(cellIndex);
    this.state.sequentialTouchnum += 1;

    this.state.sequentialTouchfromto.push(cellIndex);
    if (this.state.sequentialTouchnum == 1) {
      this.state.beforeDate = new Date(this.state.currentDate);
      console.log("before: ", this.state.beforeDate.getDate());
    } else {
      this.state.afterDate = new Date(this.state.currentDate);
      console.log("after: ", this.state.afterDate.getDate());
      // 먼저 앞에 이른 시간을 선택하고 뒤에 나중 시간을 선택할 경우(반대의 경우는 안함)
      console.log(
        "sub: ",
        (this.state.afterDate.getTime() - this.state.beforeDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );
      this.state.sub =
        (this.state.afterDate.getTime() - this.state.beforeDate.getTime()) /
        (1000 * 60 * 60 * 24);
    }
    if (this.state.sequentialTouchnum == 2) {
      /*start = Math.min(
        this.state.sequentialTouchfromto[0],
        this.state.sequentialTouchfromto[1]
      );
      end = Math.max(
        this.state.sequentialTouchfromto[0],
        this.state.sequentialTouchfromto[1]
      );*/
      const startIndex = Math.max(
        this.isTimeAearlierThanTimeB(
          this.state.sequentialTouchfromto[0],
          this.state.sequentialTouchfromto[1]
        )
          ? this.state.sequentialTouchfromto[0]
          : this.state.sequentialTouchfromto[1],
        0
      );
      const endIndex = Math.min(
        this.isTimeAearlierThanTimeB(
          this.state.sequentialTouchfromto[0],
          this.state.sequentialTouchfromto[1]
        )
          ? this.state.sequentialTouchfromto[1]
          : this.state.sequentialTouchfromto[0],
        this.props.days.length - 1
      );

      this.changeToTimeFormat(startIndex, endIndex);
      /*for (let i = start + 1; i <= end - 1; i++) {
        this.props.onSingleCellSelection(i);
      }*/
      this.fillSpaceBtwStartAndEnd(false, startIndex, endIndex);
      this.goAddSchedule();
      this.state.sequentialTouchfromto.pop();
      this.state.sequentialTouchfromto.pop();
      this.state.sequentialTouchnum = 0;
    }
  };
  /*
  selectTouchrange = () => {
    if (this.state.sequentialTouchnum == 2) {
      for (
        let i = this.state.sequentialTouchfromto[0];
        i <= this.state.sequentialTouchfromto[1];
        i++
      ) {
        this.selectSingleCell(i);
      }
    }
  };
*/
  handlePanResponderEnd = (nativeEvent) => {
    this.setState({ shouldScrollDown: false, shouldScrollUp: false });
    if (this.state.multiSelectionMode) {
      this.props.onMultiSelectionEnd(
        this.state.multiSelectionMode,
        this.state.currentSelection
      );
      this.setState({
        multiSelectionMode: null,
        initialSelectedCellIndex: null,
        currentSelection: [],
      });
      //this.state.scrollOffset = 0;
      //this.state.maxScrollOffset = 1000;
      this.goAddSchedule();
    }
  };

  findCellIndex = (locationX, locationY) => {
    const {
      initialSelectedCellIndex,
      cellLayout: { width, height },
    } = this.state;

    const cellToRight = Math.floor(locationX / (width * 3));
    const cellToBottom = Math.floor(locationY / (height * 3));
    console.log("ctr:", cellToRight, "ctb:", cellToBottom);
    //console.log('cellToBottom:',cellToBottom, 'locationY:',locationY, 'height:',height);
    //console.log(locationX);
    //console.log(locationY);
    const currentcellIndex =
      initialSelectedCellIndex +
      cellToRight +
      this.props.cellsPerRow * cellToBottom;

    //console.log('cb:',cellToBottom,'cr:',cellToRight,'ci:',currentcellIndex);
    return currentcellIndex;
  };
  isTimeAearlierThanTimeB = (aTime, bTime) => {
    if (aTime % this.props.cellsPerRow < bTime % this.props.cellsPerRow) {
      return true;
    } else if (
      aTime % this.props.cellsPerRow >
      bTime % this.props.cellsPerRow
    ) {
      return false;
    } else {
      if (aTime / this.props.cellsPerRow < bTime / this.props.cellsPerRow) {
        return true;
      } else {
        return false;
      }
    }
  };
  handleMultiSelection = (locationX, locationY) => {
    const { initialSelectedCellIndex } = this.state;
    const currentcellIndex = this.findCellIndex(locationX, locationY);
    //console.log(initialSelectedCellIndex,currentcellIndex);
    //console.log('init:',Math.floor(48 * ((initialSelectedCellIndex ) % 7) + (initialSelectedCellIndex  / 7 + 1)),'curr:',Math.floor(48 * ((currentcellIndex ) % 7) + (currentcellIndex  / 7 + 1)))
    //Math.floor(48 * ((i - 1) % 7) + (i / 7 + 1))
    const startIndex = Math.max(
      this.isTimeAearlierThanTimeB(initialSelectedCellIndex, currentcellIndex)
        ? initialSelectedCellIndex
        : currentcellIndex,
      0
    );
    const endIndex = this.isTimeAearlierThanTimeB(
      initialSelectedCellIndex,
      currentcellIndex
    )
      ? currentcellIndex
      : initialSelectedCellIndex;
    //console.log('ly',locationY);
    this.changeToTimeFormat(startIndex, endIndex);
    this.fillSpaceBtwStartAndEnd(true, startIndex, endIndex);
  };

  handleScroll = (locationY) => {
    //alert("hello");
    const calendarRelativePositionY =
      Math.floor(this.state.initialSelectedCellIndex / this.props.cellsPerRow) *
        this.state.cellLayout.height +
      locationY -
      this.state.scrollOffset;
    if (
      calendarRelativePositionY >
      this.state.calendarLayout.height - DISTANCE_BEFORE_MANUAL_SCROLL
    ) {
      this.setState({ shouldScrollDown: true });
    } else if (calendarRelativePositionY < DISTANCE_BEFORE_MANUAL_SCROLL) {
      this.setState({ shouldScrollUp: true });
    } else {
      this.setState({ shouldScrollDown: false, shouldScrollUp: false });
    }

    //console.log(calendarRelativePositionY,'offset:',this.state.scrollOffset)
  };

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => this.state.multiSelectionMode,
      onPanResponderMove: (evt, gestureState) => {
        //console.log(evt.nativeEvent.locationY,gestureState.dy)
        //const { locationX, locationY } = evt.nativeEvent;
        const locationX = evt.nativeEvent.locationX + gestureState.dx;
        const locationY =
          evt.nativeEvent.locationY + gestureState.dy + this.state.testScroll;
        /*console.log(
          "lx:",
          locationX,
          "ly:",
          locationY,
          "dy:",
          gestureState.dy,
          "ts:",
          this.state.testScroll,
          "co:",
          this.state.scrollOffset
        );*/
        this.handleMultiSelection(locationX, locationY);
        this.handleScroll(locationY);
      },

      onPanResponderTerminate: (evt) =>
        this.handlePanResponderEnd(evt.nativeEvent),
      onPanResponderRelease: (evt) =>
        this.handlePanResponderEnd(evt.nativeEvent),
    });
  }

  onFirstcellLayout = ({
    nativeEvent: {
      layout: { width, height },
    },
  }) => {
    console.log("width:", width, "height:", height);
    this.setState({
      cellLayout: {
        height,
        width,
      },
    });
  };

  isCellSelected = (index) =>
    this.state.currentSelection.includes(index) &&
    this.state.multiSelectionMode === "select";
  /*
  isCellDeselected = (index) =>
    this.state.currentSelection.includes(index) &&
    this.state.multiSelectionMode === "deselect";
*/
  /*
renderCell = ({ index, item }) => {
  item.selected = this.isCellSelected(index);
  //item.deselected = this.isCellDeselected(index);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        index % this.props.cellsPerRow ? this.selectSingleCell(index) : null;
      }}
      onLongPress={() =>
        //console.log(index, this.props.days[index]) ||
        index % this.props.cellsPerRow ? this.startMultiSelection(index) : null
      }
      delayLongPress={LONG_PRESS_TIMEOUT}
      onLayout={index === 0 ? this.onFirstcellLayout : () => {}}
    >
      <View style={{ flex: 1 }} pointerEvents="box-only">
        {this.props.renderCell(item)}
      </View>
    </TouchableWithoutFeedback>
  );
};*/

  renderCell = ({ index, item }) => {
    item.selected = this.isCellSelected(index);
    //item.deselected = this.isCellDeselected(index);

    if (index % this.props.cellsPerRow)
      return (
        <View style={{ flex: 1 }}>
          <TouchableWithoutFeedback
            onPress={() => {
              index % this.props.cellsPerRow
                ? this.selectSingleCell(index)
                : null;
            }}
            onLongPress={() =>
              //console.log(index, this.props.days[index]) ||
              index % this.props.cellsPerRow
                ? this.startMultiSelection(index)
                : null
            }
            delayLongPress={LONG_PRESS_TIMEOUT}
            onLayout={index === 0 ? this.onFirstcellLayout : () => {}}
          >
            <View
              style={{
                flex: 1,
                backgroundColor:
                  this.state.currentDate.getFullYear() ==
                    new Date().getFullYear() &&
                  this.state.currentDate.getMonth() == new Date().getMonth() &&
                  this.state.currentDate.getDate() == new Date().getDate() &&
                  index % this.props.cellsPerRow == new Date().getDay() + 1
                    ? "silver"
                    : "skyblue",
              }}
              pointerEvents="box-only"
            >
              {this.props.renderCell(item)}
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    else {
      if (this.props.cellsPerRow == 8) {
        return (
          <TouchableWithoutFeedback
            onLayout={index === 0 ? this.onFirstcellLayout : () => {}}
          >
            <View
              style={{ flex: 0.6, backgroundColor: "skyblue" }}
              pointerEvents="box-only"
            >
              {this.props.renderCell(item)}
            </View>
          </TouchableWithoutFeedback>
        );
      } else {
        return (
          <TouchableWithoutFeedback
            onLayout={index === 0 ? this.onFirstcellLayout : () => {}}
          >
            <View
              style={{ flex: 0.08, backgroundColor: "skyblue" }}
              pointerEvents="box-only"
            >
              {this.props.renderCell(item)}
            </View>
          </TouchableWithoutFeedback>
        );
      }
    }
  };

  onCalendarLayout = ({
    nativeEvent: {
      layout: { x, y, width, height },
    },
  }) => {
    this.setState({
      calendarLayout: {
        height,
        width,
      },
    });
  };

  onScroll = (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const maxScrollOffset = contentSize.height - layoutMeasurement.height;
    //console.log('conoff:',contentOffset.y,'max:',maxScrollOffset,'cs:',contentSize,'lm:',layoutMeasurement)
    this.setState({ maxScrollOffset, scrollOffset: contentOffset.y });
  };

  render() {
    this.state.currentDate = this.props.currentDate
      ? new Date(this.props.currentDate)
      : new Date();
    //console.log("render date:", this.state.currentDate.getDate());
    const { days, cellsPerRow } = this.props;
    /*let changeDays = this.props.days;
    for (let i = 0; i < 48; i++) {
      changeDays[i * 2].id = this.changetoLayoutTime(i);
      changeDays[i * 2].number = this.changetoLayoutTime(i);
      //console.log("Days:", changeDays);
    }
    for (let i = 0; i < 48; i++) {
      changeDays[i * 2 + 1].id = " ";
      changeDays[i * 2 + 1].number = " ";
      //console.log("Days:", changeDays);
    }
    const renderedCells = changeDays;*/
    const renderedCells = days;

    return (
      <View {...this.panResponder.panHandlers}>
        <FlatList
          ref={(ref) => (this.flatList = ref)}
          onLayout={this.onCalendarLayout}
          data={renderedCells}
          onScroll={this.onScroll}
          renderItem={this.renderCell}
          numColumns={cellsPerRow}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={this.state.initialSelectedCellIndex === null}
          //contentContainerStyle={{ paddingBottom: 180 }}
        />
      </View>
    );
  }
}
