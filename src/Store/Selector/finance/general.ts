import { RootState } from '../../Store';

export const selectBookingGeneralState = (state: RootState) => state.finance.general;

export const selectAllFinanceRecords = (state: RootState) =>
  selectBookingGeneralState(state).allFinanceRecords;
export const selectFinanceSummary = (state: RootState) =>
  selectBookingGeneralState(state).financeSummary;
