export interface Room {
  name: string;
  id: string;
}

export enum RoomStatus {
  NOT_AVAILABLE = 'NOT_AVAILABLE',
  AVAILABLE = 'AVAILABLE',
  BOOKED = 'BOOKED', //need current booking id
  INHABITED = 'INHABITED', //need current booking id
  GUEST_OUT_AND_NEED_TO_BE_CLEANED = 'GUEST_OUT_AND_NEED_TO_BE_CLEANED',
  ROOM_NEED_TO_BE_CLEANED = 'ROOM_NEED_TO_BE_CLEANED',
}
