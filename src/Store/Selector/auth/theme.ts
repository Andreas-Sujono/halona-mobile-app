import { ColorType } from 'utils/colors';
import { RootState } from '../../Store';

export const selectAuthThemeState = (state: RootState) => state.auth.theme;

export const selectColors = (state: RootState) =>
  selectAuthThemeState(state).colors as Record<ColorType, string>;
export const selectTheme = (state: RootState) => selectAuthThemeState(state).theme;
export const selectFontSizeScale = (state: RootState) => selectAuthThemeState(state).fontSizeScale;
