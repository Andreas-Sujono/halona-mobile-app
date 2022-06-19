import axios from 'axios';
import { Booking, Id, Room } from '../../../model';
import BaseService, { API_BASE_URL_PATH } from '../base';

export default class BookingService extends BaseService {
  getAllRooms = async () => {
    const res = await this.getRequest('/rooms?join=currentBooking');
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

  getFloorPlan = async (date?: Date) => {
    if (!date) {
      date = new Date();
    }
    const res = await this.getRequest(`/rooms/floor-plan?date=${date}`);
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
    console.log('getAvailableRooms: ', res.data);
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
    const mappedData: any = data;
    mappedData.rooms = data.rooms.map((item) => ({ id: item.id }));
    delete mappedData.id;
    const res = await this.postRequest('/bookings', mappedData);
    return res.data;
  };

  updateBooking = async (bookingId: Id, data: Room) => {
    console.log(bookingId, data);
    const res = await this.patchRequest(`/bookings/${bookingId}`, data);
    console.log('update book res: ', res);
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
