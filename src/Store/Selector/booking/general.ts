import { RootState } from '../../Store';

export const selectBookingGeneralState = (state: RootState) => state.booking.general;

export const selectAllRooms = (state: RootState) => selectBookingGeneralState(state).allRooms;
export const selectFloorPlan = (state: RootState) => selectBookingGeneralState(state).floorPlan;
export const selectAllBookings = (state: RootState) => {
  // console.log('selectAllBookings: ', state.booking);
  return selectBookingGeneralState(state).allBookings;
};
export const selectRoomSummary = (state: RootState) => selectBookingGeneralState(state).roomSummary;
export const selectMainBookingDateView = (state: RootState) =>
  selectBookingGeneralState(state).mainBookingDateView;
export const selectUseFloorPlanView = (state: RootState) =>
  selectBookingGeneralState(state).useFloorPlanView;
