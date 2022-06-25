import { DARK_COLORS } from './../../../../utils/colors';
import { COLORS } from 'utils/colors';
import {
  composeWithNamespace,
  set as commonSet,
  loadRequest as commonLoadRequest,
  loadSuccess as commonLoadSuccess,
  loadFailed as commonLoadFailed,
} from '@/utils/redux';

const types = ['SET', 'RESET', 'LOAD_REQUEST', 'LOAD_SUCCESS', 'LOAD_FAILED'];

export const ActionTypes = composeWithNamespace(types, 'AUTH_THEME');

export const set = (key: string, value: any) => commonSet(ActionTypes, key, value);

// TODO: separate async (Request, success, failed), for each independent call
export const loadRequest = (data: any) => commonLoadRequest(ActionTypes, data);
export const loadSuccess = (data: any) => commonLoadSuccess(ActionTypes, data);
export const loadFailed = () => commonLoadFailed(ActionTypes);

export const setTheme = (theme: 'light' | 'dark') => set('theme', theme);
export const setColors = (colors: any) => set('colors', colors);
export const setToLightColors = () =>
  set('colors', {
    primary: COLORS.PRIMARY,
    secondary: COLORS.SECONDARY,
    tertiary: COLORS.TERTIARY,
    textPrimary: COLORS.TEXT_PRIMARY,
    textSecondary: COLORS.TEXT_SECONDARY,
    texttertiary: COLORS.TEXT_TERTIARY,
    textCta: COLORS.TEXT_CTA,
  });
export const setToDarkColors = () =>
  set('colors', {
    primary: DARK_COLORS.PRIMARY,
    secondary: DARK_COLORS.SECONDARY,
    tertiary: DARK_COLORS.TERTIARY,
    textPrimary: DARK_COLORS.TEXT_PRIMARY,
    textSecondary: DARK_COLORS.TEXT_SECONDARY,
    texttertiary: DARK_COLORS.TEXT_TERTIARY,
    textCta: DARK_COLORS.TEXT_CTA,
  });
export const setFontSizeScale = (fontSizeScale: number) => set('fontSizeScale', fontSizeScale);

export const reset = () => ({
  type: ActionTypes.RESET,
  payload: {},
});
