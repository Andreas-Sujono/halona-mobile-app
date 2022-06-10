import { RootState } from '../../Store';

export const selectAuthGeneralState = (state: RootState) => state.auth.general;

export const selectUser = (state: RootState) => selectAuthGeneralState(state).user as any;
export const selectUserRole = (state: RootState) => selectAuthGeneralState(state).role;
export const selectUserId = (state: RootState) => selectAuthGeneralState(state).user?.id || null;
export const selectIsAuthenticated = (state: RootState) =>
  selectAuthGeneralState(state).isAuthenticated || null;

export const selectPortfolio = (state: RootState) =>
  selectAuthGeneralState(state).portfolio || null;
export const selectPremiumSetting = (state: RootState) =>
  selectAuthGeneralState(state).user?.premiumSetting || null;
