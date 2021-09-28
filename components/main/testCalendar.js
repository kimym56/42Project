// @flow

import React, { Component } from 'react';
import { View, FlatList, TouchableWithoutFeedback, PanResponder, Vibration } from 'react-native';

const LONG_PRESS_TIMEOUT = 400;
const VIBRATION_DURATION = 500;
const SCROLL_INCREMENTATION = 20;
const DISTANCE_BEFORE_MANUAL_SCROLL = 50;


export default class Test extends Component {
  panResponder;
  flatList;

  static defaultProps = {
    cellsPerRow: 1,
  };

  state = {
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

  componentDidUpdate() {
    const { shouldScrollUp, shouldScrollDown, scrollOffset, maxScrollOffset } = this.state;
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
      multiSelectionMode: isCellAlreadyActive ? 'deselect' : 'select',
      initialSelectedCellIndex: cellIndex,
    });

    Vibration.vibrate(VIBRATION_DURATION);
  };

  selectSingleCell = (cellIndex) => this.props.onSingleCellSelection(cellIndex);

  handlePanResponderEnd = nativeEvent => {
    this.setState({ shouldScrollDown: false, shouldScrollUp: false });
    if (this.state.multiSelectionMode) {
      this.props.onMultiSelectionEnd(this.state.multiSelectionMode, this.state.currentSelection);
      this.setState({
        multiSelectionMode: null,
        initialSelectedCellIndex: null,
        currentSelection: [],
      });
    }
  };

  findCellIndex = (locationX, locationY) => {
    const {
      initialSelectedCellIndex,
      cellLayout: { width, height },
    } = this.state;

    const cellToRight = Math.floor(locationX / width);
    console.log(locationX,width,cellToRight)
    const cellToBottom = Math.floor(locationY / height);

    const currentcellIndex =
      initialSelectedCellIndex + cellToRight + this.props.cellsPerRow * cellToBottom;
    return currentcellIndex;
  };

  handleMultiSelection = (locationX, locationY) => {
    const { initialSelectedCellIndex } = this.state;
    const currentcellIndex = this.findCellIndex(locationX, locationY);

    const startIndex = Math.max(Math.min(initialSelectedCellIndex, currentcellIndex), 0);
    const endIndex = Math.min(
      Math.max(initialSelectedCellIndex, currentcellIndex),
      this.props.days.length - 1
    );

    let currentSelection = [];
    for (let i = startIndex; i <= endIndex; i++) {
      currentSelection.push(i);
    }

    this.setState({ currentSelection });
  };

  handleScroll = (locationY) => {
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
      onPanResponderMove: (evt,gestureState) => {
        const locationX = evt.nativeEvent.locationX+gestureState.dx;
        const locationY = evt.nativeEvent.locationY+gestureState.dy;

        this.handleMultiSelection(locationX, locationY);
        this.handleScroll(locationY);
      },
      onPanResponderTerminate: evt => this.handlePanResponderEnd(evt.nativeEvent),
      onPanResponderRelease: evt => this.handlePanResponderEnd(evt.nativeEvent),
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

  isCellSelected = index =>
    this.state.currentSelection.includes(index) && this.state.multiSelectionMode === 'select';

  isCellDeselected = index =>
    this.state.currentSelection.includes(index) && this.state.multiSelectionMode === 'deselect';

  renderCell = ({ index, item }) => {
    item.selected = this.isCellSelected(index);
    item.deselected = this.isCellDeselected(index);

    return (
      <TouchableWithoutFeedback
        onPress={() => this.selectSingleCell(index)}
        onLongPress={() => this.startMultiSelection(index)}
        delayLongPress={LONG_PRESS_TIMEOUT}
        onLayout={index === 0 ? this.onFirstcellLayout : () => {}}
      >
        <View style={{ flex: 1 }} pointerEvents="box-only">
          {this.props.renderCell(item)}
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

      if (renderedCell.active || renderedCell.selected || renderedCell.deselected) {
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
      <View {...this.panResponder.panHandlers} style={{marginBottom:80}}>
        <FlatList
          ref={ref => (this.flatList = ref)}
          onLayout={this.onCalendarLayout}
          data={renderedCells}
          onScroll={this.onScroll}
          renderItem={this.renderCell}
          numColumns={cellsPerRow}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={this.state.initialSelectedCellIndex === null}
        />
      </View>
    );
  }
}