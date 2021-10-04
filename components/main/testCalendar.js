// @flow

import React, { Component } from "react";
import {
  View,
  FlatList,
  TouchableWithoutFeedback,
  PanResponder,
  Vibration,
  Text,
} from "react-native";

const LONG_PRESS_TIMEOUT = 200;
const VIBRATION_DURATION = 300;
const SCROLL_INCREMENTATION = 10;
const DISTANCE_BEFORE_MANUAL_SCROLL = 50;

export default class Test extends Component {
  panResponder;
  flatList;

  static defaultProps = {
    cellsPerRow: 7,
  };

  state = {
    startselectDate: new Date(),
    endselectDate: new Date(),
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
    } else if (shouldScrollDown) {
      const scrollOffsetValue = this.state.maxScrollOffset
        ? Math.min(scrollOffset + SCROLL_INCREMENTATION, maxScrollOffset)
        : scrollOffset + SCROLL_INCREMENTATION;

      this.flatList.scrollToOffset({
        offset: scrollOffsetValue,
        animated: false,
      });
    }
  }

  isCellActive = (cellIndex) => this.props.days[cellIndex].active;

  startMultiSelection = (cellIndex) => {
    const isCellAlreadyActive = this.isCellActive(cellIndex);
    this.setState({
      multiSelectionMode: isCellAlreadyActive ? "deselect" : "select",
      initialSelectedCellIndex: cellIndex,
    });

    Vibration.vibrate(VIBRATION_DURATION);
  };

  selectSingleCell = (cellIndex) => {
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
        this.isTimeAearlierThanTimeB(this.state.sequentialTouchfromto[0],
          this.state.sequentialTouchfromto[1])
          ? this.state.sequentialTouchfromto[0]
          : this.state.sequentialTouchfromto[1],
        0
      );
      const endIndex = Math.min(
        this.isTimeAearlierThanTimeB(this.state.sequentialTouchfromto[0],
          this.state.sequentialTouchfromto[1])
          ? this.state.sequentialTouchfromto[1]
          : this.state.sequentialTouchfromto[0],
        this.props.days.length - 1
      );
      
      // Have to change setHours(1, 2, 3 -> 12:00, 12:30, 1:00)
      this.state.startselectDate.setHours(startIndex + 1);
      this.state.endselectDate.setHours(endIndex + 1);
      /*for (let i = start + 1; i <= end - 1; i++) {
        this.props.onSingleCellSelection(i);
      }*/

      const start_x = (startIndex % this.props.cellsPerRow) + 1;
      const start_y = startIndex / this.props.cellsPerRow + 1;
      const end_x = (endIndex % this.props.cellsPerRow) + 1;
      const end_y = endIndex / this.props.cellsPerRow + 1;
      if (start_x == end_x) {
        for (let j = Math.floor(start_y); j <= Math.floor(end_y); j++) {
          this.props.onSingleCellSelection(this.props.cellsPerRow * (j - 1) + start_x - 1);
        }
      } else {
        for (let j = Math.floor(start_y); j <= 48; j++) {
          this.props.onSingleCellSelection(this.props.cellsPerRow * (j - 1) + start_x - 1);
        }
        for (let j = 1; j <= Math.floor(end_y); j++) {
          this.props.onSingleCellSelection(this.props.cellsPerRow * (j - 1) + end_x - 1);
        }
        for (let i = start_x + 1; i <= end_x - 1; i++) {
          for (let j = 1; j <= 48; j++) {
            this.props.onSingleCellSelection(this.props.cellsPerRow * (j - 1) + i - 1);
          }
        }
      }
      this.goAddSchedule();
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
      this.goAddSchedule();
    }
  };

  findCellIndex = (locationX, locationY) => {
    const {
      initialSelectedCellIndex,
      cellLayout: { width, height },
    } = this.state;

    const cellToRight = Math.floor(locationX / (width * 2));
    //console.log('cellToRight:',cellToRight, 'locationX:',locationX, 'width:',width);
    const cellToBottom = Math.floor(locationY / (height * 2));
    //console.log(locationX);
    //console.log(locationY);
    const currentcellIndex =
      initialSelectedCellIndex +
      cellToRight +
      this.props.cellsPerRow * cellToBottom;

    //console.log(currentcellIndex,locationX,width)
    return currentcellIndex;
  };
  isTimeAearlierThanTimeB = (aTime, bTime) => {
    if (aTime % this.props.cellsPerRow < bTime % this.props.cellsPerRow) {
      return true;
    } else if (aTime % this.props.cellsPerRow > bTime % this.props.cellsPerRow) {
      return false;
    } else {
      if ((aTime / this.props.cellsPerRow) < (bTime / this.props.cellsPerRow)) {
        return true;
      } else {
        return false;
      }
    }
  };
  handleMultiSelection = (locationX, locationY) => {
    const { initialSelectedCellIndex } = this.state;
    const currentcellIndex = this.findCellIndex(locationX, locationY);

    const startIndex = Math.max(
      this.isTimeAearlierThanTimeB(initialSelectedCellIndex, currentcellIndex)
        ? initialSelectedCellIndex
        : currentcellIndex,
      0
    );
    const endIndex = Math.min(
      this.isTimeAearlierThanTimeB(initialSelectedCellIndex, currentcellIndex)
        ? currentcellIndex
        : initialSelectedCellIndex,
      this.props.days.length - 1
    );
    console.log(startIndex, endIndex);
    let currentSelection = [];
    const start_x = (startIndex % this.props.cellsPerRow) + 1;
    const start_y = startIndex / this.props.cellsPerRow + 1;
    const end_x = (endIndex % this.props.cellsPerRow) + 1;
    const end_y = endIndex / this.props.cellsPerRow + 1;
    if (start_x == end_x) {
      for (let j = Math.floor(start_y); j <= Math.floor(end_y); j++) {
        currentSelection.push(this.props.cellsPerRow * (j - 1) + start_x - 1);
      }
    } else {
      for (let j = Math.floor(start_y); j <= 48; j++) {
        currentSelection.push(this.props.cellsPerRow * (j - 1) + start_x - 1);
      }
      for (let j = 1; j <= Math.floor(end_y); j++) {
        currentSelection.push(this.props.cellsPerRow * (j - 1) + end_x - 1);
      }
      for (let i = start_x + 1; i <= end_x - 1; i++) {
        for (let j = 1; j <= 48; j++) {
          currentSelection.push(this.props.cellsPerRow * (j - 1) + i - 1);
        }
      }
    }

    this.setState({ currentSelection });
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
  };

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => this.state.multiSelectionMode,

      onPanResponderMove: (evt, gestureState) => {
        //const { locationX, locationY } = evt.nativeEvent;
        const locationX = evt.nativeEvent.locationX + gestureState.dx;
        const locationY = evt.nativeEvent.locationY + gestureState.dy;

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

  isCellDeselected = (index) =>
    this.state.currentSelection.includes(index) &&
    this.state.multiSelectionMode === "deselect";

  renderCell = ({ index, item }) => {
    item.selected = this.isCellSelected(index);
    item.deselected = this.isCellDeselected(index);

    return (
      <TouchableWithoutFeedback
        onPress={() => this.selectSingleCell(index)}
        onLongPress={() =>
          console.log(index, this.props.days[index]) ||
          this.startMultiSelection(index)
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
    this.setState({ maxScrollOffset, scrollOffset: contentOffset.y });
  };

  render() {
    const { days, cellsPerRow } = this.props;

    const renderedCells = days.map((item, index) => {
      const renderedCell = {
        ...item,
        selected: this.isCellSelected(index),
        deselected: this.isCellDeselected(index),
        first: false,
        last: false,
      };

      if (
        renderedCell.active ||
        renderedCell.selected ||
        renderedCell.deselected
      ) {
        if (
          index === 0 ||
          (!this.isCellSelected(index - 1) &&
            !this.isCellDeselected(index - 1) &&
            !days[index - 1].active)
        ) {
          renderedCell.first = true;
        }
        if (
          index === days.length - 1 ||
          (!this.isCellSelected(index + 1) &&
            !this.isCellDeselected(index + 1) &&
            !days[index + 1].active)
        ) {
          renderedCell.last = true;
        }
      }

      return renderedCell;
    });

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
        />
      </View>
    );
  }
}
