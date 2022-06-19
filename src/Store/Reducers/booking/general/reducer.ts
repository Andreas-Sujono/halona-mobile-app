import {
  initEntityState,
  entityLoadingStarted,
  entityLoadingSucceeded,
  entityLoadingFailed,
} from '@/utils/redux';
import { AnyAction } from '@reduxjs/toolkit';
import { ActionTypes } from '../../../Actions/booking/general';

const initialState = initEntityState({
  floorPlan: [
    {
      id: 1,
      floorName: 'Lv1',
      rooms: [],
    },
  ],
  allRooms: [],
  allBookings: {
    pages: [],
  },
  roomSummary: {
    availableRoomsCount: 0,
    allRoomsCount: 0,
  },
});

function reducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case ActionTypes.SET: {
      const updatedState = {
        ...state,
        [action.payload.key]: action.payload.value,
      };
      return updatedState;
    }

    case ActionTypes.LOAD_REQUEST: {
      return entityLoadingStarted(state, action.payload);
    }
    case ActionTypes.LOAD_SUCCESS: {
      return entityLoadingSucceeded(state, action.payload);
    }
    case ActionTypes.LOAD_FAILED: {
      return entityLoadingFailed(state);
    }

    case ActionTypes.RESET:
      return initialState;

    default:
      return state;
  }
}

export default reducer;
