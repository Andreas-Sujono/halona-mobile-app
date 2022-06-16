export enum RoomStatus {
  NOT_AVAILABLE = 'NOT_AVAILABLE',
  AVAILABLE = 'AVAILABLE',
  BOOKED = 'BOOKED', //need current booking id
  INHABITED = 'INHABITED', //need current booking id
  GUEST_OUT_AND_NEED_TO_BE_CLEANED = 'GUEST_OUT_AND_NEED_TO_BE_CLEANED',
  ROOM_NEED_TO_BE_CLEANED = 'ROOM_NEED_TO_BE_CLEANED',
}

export enum BookingStatus {
  VOID = 'VOID',
  PENDING = 'PENDING',
  PAID = 'PAID',
  CHECKED_IN_WITH_DEPOSIT = 'CHECKED_IN_WITH_DEPOSIT',
  CHECKED_OUT = 'CHECKED_OUT',
  CANCELLED_AND_MONEY_RETURNED = 'CANCELLED_AND_MONEY_RETURNED',
  CANCELLED_AND_MONEY_HAS_NOT_RETURNED = 'CANCELLED_AND_MONEY_HAS_NOT_RETURNED',
  CANCELLED = 'CANCELLED',
}

export interface Room {
  name: string;
  id: string;
  code?: string;
  status: RoomStatus;
  baselinePrice: number;
  currentBooking: Booking;
  description: string;
  notes: string;
  maxPeople: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum BookingType {
  WALK_IN = 'WALK_IN',
  ONLINE = 'ONLINE',
}

export interface Booking {
  id: string;
  rooms: Room[];
  status: BookingStatus;
  type: BookingType;
  onlineProviderName?: string;
  onlineProviderId?: string;
  guestName: string;
  guestPhoneNumber?: string;
  guestEmail?: string;
  price: number;
  createdAt: Date;
}
