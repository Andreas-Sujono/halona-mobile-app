/* eslint-disable react-native/no-inline-styles */
import React, { memo, useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
} from 'react-native';
import styled from 'styled-components/native';
import { animateMove, getNextState } from './utils';

export const HorizontalMiniLine = styled.View`
  margin: 0 auto 15px auto;
  height: 12px;
  width: 50%;
  border-bottom-width: 3px;
  border-bottom-color: #d3d3d3;
`;
export const HorizontalLine = styled.View`
  margin: 0 auto 0 auto;
  height: 30px;
  width: 70%;
  border-bottom-width: 3px;
  border-bottom-color: #d3d3d3;
`;

interface BottomDrawerProps {
  children?: React.ReactNode;
  onDrawerStateChange: (nextState: DrawerState) => void;
}

const { height } = Dimensions.get('window');
export enum DrawerState {
  OPEN = height - 230,
  PEEK = 230,
  CLOSED = 0,
}

function BottomDrawer({ children, onDrawerStateChange }: BottomDrawerProps) {
  const { height } = Dimensions.get('window');
  const y = React.useRef(new Animated.Value(DrawerState.CLOSED)).current;
  const drawerState = React.useRef(new Animated.Value(DrawerState.CLOSED)).current;

  const margin = 0.05 * height;
  const movementValue = (moveY: number) => height - moveY;

  useEffect(() => {
    //open fully
    drawerState.setValue(DrawerState.OPEN);
    animateMove(y, DrawerState.OPEN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPanResponderMove = (_: GestureResponderEvent, { moveY }: PanResponderGestureState) => {
    const val = movementValue(moveY);
    animateMove(y, val);
  };

  const onPanResponderRelease = (_: GestureResponderEvent, { moveY }: PanResponderGestureState) => {
    const valueToMove = movementValue(moveY);
    const nextState = getNextState((drawerState as any)._value, valueToMove, margin);
    drawerState.setValue(nextState);
    animateMove(y, nextState, onDrawerStateChange(nextState));
  };
  const onMoveShouldSetPanResponder = (
    _: GestureResponderEvent,
    { dy }: PanResponderGestureState
  ) => Math.abs(dy) >= 10;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder,
      onStartShouldSetPanResponderCapture: onMoveShouldSetPanResponder,
      onPanResponderMove,
      onPanResponderRelease,
    })
  ).current;

  return (
    <Animated.View
      style={[
        {
          width: '100%',
          height: height,
          backgroundColor: '#fff',
          borderRadius: 48,
          position: 'absolute',
          bottom: -height + 30,
          transform: [{ translateY: y }],
          minHeight: 500,
          zIndex: 10000,
          padding: 16,
          paddingTop: 0,
          shadowColor: 'grey',
          shadowOffset: { width: 5, height: 5 },
          shadowOpacity: 0.4,
          shadowRadius: 13,
          elevation: 15,
        },
      ]}
    >
      <HorizontalLine {...panResponder.panHandlers} />
      <HorizontalMiniLine />
      {children}
    </Animated.View>
  );
}

export default memo(BottomDrawer);
