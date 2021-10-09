// @flow

import React, { Component } from "react";
import {
  View,
  FlatList,
  TouchableWithoutFeedback,
  PanResponder,
  Vibration,
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
    testScroll: 0,
    startselectDate: new Date(this.props.startselectValue),
    endselectDate: new Date(this.props.endselectValue),
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
    this.props.navigation.navigate("AddEvent", {
      startdateValue: this.state.startselectDate,
      enddateValue: this.state.endselectDate,
    });
  }

  componentDidUpdate() {
    const {
      shouldScrollUp,
      shouldScrollDown,
      scrollOffset,
      maxScrollOffset,
    } = this.state;

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
    const isCellAlreadyActive = this.isCellActive(cellIndex);
    this.setState({
      multiSelectionMode: "select", //취소 기능 코드 multiSelectionMode: isCellAlreadyActive ? "deselect" : "select"
      initialSelectedCellIndex: cellIndex,
    });

    Vibration.vibrate(VIBRATION_DURATION);
  };
  changeToTimeFormat = (startIndex, endIndex) => {
    console.log(
      "inchangetotimeformat: ",
      this.state.startselectDate.getDate(),
      this.state.endselectDate.getDate()
    );
    this.state.startselectDate = new Date(this.props.startselectValue);
    this.state.endselectDate = new Date(this.props.endselectValue);
    let startTimeIndex = startIndex;
    let endTimeIndex = endIndex;
    let toFirstStartIndex =
      startTimeIndex - (startTimeIndex % this.props.cellsPerRow);
    let toFirstEndIndex =
      endTimeIndex - (endTimeIndex % this.props.cellsPerRow);
    this.state.startselectDate.setHours(
      (startTimeIndex % this.props.cellsPerRow) * 24 +
        toFirstStartIndex / (this.props.cellsPerRow * 2)
    );
    //console.log(this.state.startselectDate);
    if (toFirstEndIndex % (this.props.cellsPerRow * 2) != 0) {
      this.state.endselectDate.setHours(
        (endTimeIndex % this.props.cellsPerRow) * 24 +
          toFirstEndIndex / (this.props.cellsPerRow * 2) +
          1
      );
    } else {
      this.state.endselectDate.setHours(
        (endTimeIndex % this.props.cellsPerRow) * 24 +
          toFirstEndIndex / (this.props.cellsPerRow * 2)
      );
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
    console.log(
      "props:",
      this.props.startselectValue.getDate(),
      this.props.endselectValue.getDate()
    );

    this.props.onSingleCellSelection(cellIndex);
    this.state.sequentialTouchnum += 1;
    this.state.sequentialTouchfromto.push(cellIndex);
    if (this.state.sequentialTouchnum % 2 == 0) {
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

      // Have to change setHours(1, 2, 3 -> 12:00, 12:30, 1:00)
      this.changeToTimeFormat(startIndex, endIndex);
      /*for (let i = start + 1; i <= end - 1; i++) {
        this.props.onSingleCellSelection(i);
      }*/
      this.fillSpaceBtwStartAndEnd(false, startIndex, endIndex);
      this.goAddSchedule();
      this.state.sequentialTouchfromto.pop();
      this.state.sequentialTouchfromto.pop();
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

    const cellToRight = Math.floor(locationX / width);
    const cellToBottom = Math.floor(locationY / height);

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

    // Have to change setHours(1, 2, 3 -> 12:00, 12:30, 1:00)

    console.log(startIndex, endIndex);

    console.log(this.state.startselectDate, this.state.endselectDate);
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
        console.log(
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
        );
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
          {/*<Text>hi</Text>*/}
        </View>
      </TouchableWithoutFeedback>
    );
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
    const { days, cellsPerRow } = this.props;

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
