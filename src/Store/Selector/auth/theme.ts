import { RootState } from '../../Store';

export const selectAuthThemeState = (state: RootState) => state.auth.theme;

export const selectColors = (state: RootState) => selectAuthThemeState(state).colors;
export const selectTheme = (state: RootState) => selectAuthThemeState(state).theme;
export const selectFontSizeScale = (state: RootState) => selectAuthThemeState(state).fontSizeScale;
