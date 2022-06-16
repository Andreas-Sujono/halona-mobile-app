import { Animated } from 'react-native';
import { DrawerState } from './BottomDrawer';

export const animateMove = (
  y: Animated.Value,
  toValue: number | Animated.Value,
  callback?: any
) => {
  Animated.spring(y, {
    toValue: -toValue,
    tension: 20,
    useNativeDriver: true,
  }).start((finished) => {
    /* Optional: But the purpose is to call this after the the animation has finished. Eg. Fire an event that will be listened to by the parent component */
    finished && callback && callback();
  });
};

export const getNextState = (
  currentState: DrawerState,
  val: number,
  margin: number
): DrawerState => {
  switch (currentState) {
    case DrawerState.PEEK:
      return val >= currentState + margin
        ? DrawerState.OPEN
        : val <= DrawerState.PEEK - margin
        ? DrawerState.CLOSED
        : DrawerState.PEEK;
    case DrawerState.OPEN:
      return val >= currentState
        ? DrawerState.OPEN
        : val <= DrawerState.PEEK
        ? DrawerState.CLOSED
        : DrawerState.PEEK;
    case DrawerState.CLOSED:
      return val >= currentState + margin
        ? val <= DrawerState.PEEK + margin
          ? DrawerState.PEEK
          : DrawerState.OPEN
        : DrawerState.CLOSED;
    default:
      return currentState;
  }
};
