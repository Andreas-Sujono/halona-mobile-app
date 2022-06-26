import {
  initEntityState,
  entityLoadingStarted,
  entityLoadingSucceeded,
  entityLoadingFailed,
} from '@/utils/redux';
import { AnyAction } from '@reduxjs/toolkit';
import { COLORS } from 'utils/colors';
import { ActionTypes } from '../../../Actions/auth/theme';

const initialState = initEntityState({
  colors: {
    primary: COLORS.PRIMARY,
    secondary: COLORS.SECONDARY,
    tertiary: COLORS.TERTIARY,
    textPrimary: COLORS.TEXT_PRIMARY,
    textSecondary: COLORS.TEXT_SECONDARY,
    texttertiary: COLORS.TEXT_TERTIARY,
    textCta: COLORS.TEXT_CTA,
  },
  theme: 'light', //light | dark
  fontSizeScale: 1,
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
