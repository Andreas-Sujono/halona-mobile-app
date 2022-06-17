import axios from 'axios';
import { Booking, Id, Room } from '../../../model';
import BaseService, { API_BASE_URL_PATH } from '../base';

export default class BookingService extends BaseService {
  getAllRooms = async () => {
    const res = await this.getRequest('/rooms?join=currentBooking');
    return res.data;
  };

  getFloorPlan = async () => {
    const res = await this.getRequest('/rooms/floor-plan');
    return res.data;
  };

  getRoomSummary = async () => {
    const res = await this.getRequest('/rooms/summary');
    return res.data;
  };

  getAvailableRooms = async () => {
    const res = await this.getRequest('/rooms/available');
    if (res?.data?.length) {
      res.data.sort((a: Room, b: Room) =>
        a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' })
      );
      res.data = res.data.map((item: Room, idx: number) => ({
        ...item,
        label: item.name,
        value: item.id,
        index: idx,
      }));
    }
    return res.data;
  };

  getOneRoom = async (roomId: Id) => {
    const res = await this.getRequest(`/rooms/${roomId}`);
    return res.data;
  };

  getAllBookings = async (page = 1, limit = 25) => {
    const res = await this.getRequest(`/bookings?page=${page}&limit=${limit}`);
    return res.data;
  };

  getOneBooking = async (bookingId?: Id) => {
    if (!bookingId) {
      return {};
    }
    const res = await this.getRequest(`/bookings/${bookingId}`);
    return res.data;
  };

  updateRoom = async (roomId: Id, data: Partial<Room>) => {
    const res = await this.patchRequest(`/rooms/${roomId}`, {
      status: data.status,
      description: data.description,
      name: data.name,
    });
    return res.data;
  };

  createBooking = async (data: Booking) => {
    const res = await this.postRequest('/bookings', data);
    return res.data;
  };

  updateBooking = async (bookingId: Id, data: Room) => {
    const res = await this.patchRequest(`/bookings/${bookingId}`, data);
    return res.data;
  };

  deleteBooking = async (bookingId: Id) => {
    const res = await this.deleteRequest(`/bookings/${bookingId}`);
    return res.data;
  };

  checkInBooking = async (bookingId: Id) => {
    const res = await this.patchRequest(`/bookings/${bookingId}/check-in`, {});
    return res.data;
  };

  checkOutBooking = async (bookingId: Id) => {
    const res = await this.patchRequest(`/bookings/${bookingId}/check-out`, {});
    return res.data;
  };
}

//common instance of service
const { CancelToken } = axios;
const source = CancelToken.source();
const canceler = source.cancel;

const bookingService = new BookingService({
  baseUrl: API_BASE_URL_PATH,
  cancelToken: source.token,
});

export { bookingService, canceler };
