import { useWrappedMutation } from './../utils';
import { setFloorPlan, setRoomSummary } from './../../../Store/Actions/booking/general/general';
import {
  selectAllRooms,
  selectFloorPlan,
  selectMainBookingDateView,
  selectRoomSummary,
} from './../../../Store/Selector/booking/general';
import { InternetConnectivityContext } from 'Context/useInternetConnectivity';
import { Id } from 'model';
import { useContext } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { bookingService } from 'Services/Api/booking/general';
import { useAppDispatch, useAppSelector } from 'Store';
import { QUERY_KEY } from '../queryKeys';
import { handleCallFailure, validateAfterCall } from '../utils';
import { setAllRooms } from 'Store/Actions/booking/general';

export const useAllRoomsData = () => {
  const dispatch = useAppDispatch();
  const { isConnected } = useContext(InternetConnectivityContext);
  const initialData: any = useAppSelector(selectAllRooms);

  return useQuery(QUERY_KEY.ROOMS, bookingService.getAllRooms, {
    onSuccess: (res: any) => {
      if (!validateAfterCall(res)) {
        // throw error message
        return;
      }
      dispatch(setAllRooms(res)); //save to cache
    },
    onError: (res: any) => {
      handleCallFailure(res.message);
    },
    enabled: isConnected, //only call when there's internet
    initialData, //use cached or default data
  });
};

export const useFloorPlanData = () => {
  const dispatch = useAppDispatch();
  const { isConnected } = useContext(InternetConnectivityContext);
  const initialData = useAppSelector(selectFloorPlan);
  const mainDateView = useAppSelector(selectMainBookingDateView);

  return useQuery(
    [QUERY_KEY.ROOMS_FLOOR_PLAN, mainDateView],
    ({ queryKey }) => bookingService.getFloorPlan(queryKey[1]),
    {
      onSuccess: (res: any) => {
        if (!validateAfterCall(res)) {
          return;
        }
        dispatch(setFloorPlan(res)); //save to cache
      },
      onError: (res: any) => {
        handleCallFailure(res.message);
      },
      enabled: isConnected, //only call when there's internet
      initialData, //use cached or default data
    }
  );
};

export const useRoomData = (roomId: Id) => {
  const { isConnected } = useContext(InternetConnectivityContext);

  return useQuery(
    [QUERY_KEY.ROOM, roomId],
    (context) => bookingService.getOneRoom(context.queryKey[1]),
    {
      onSuccess: (res: any) => {
        if (!validateAfterCall(res)) {
          return;
        }
      },
      enabled: isConnected, //only call when there's internet
      initialData: {},
    }
  );
};

export const useUpdateRoom = (roomId: Id) => {
  const queryClient = useQueryClient();

  return useWrappedMutation((data: any) => bookingService.updateRoom(roomId, data), {
    onSuccess: (res: any) => {
      if (!validateAfterCall(res, true, true, 'You have successfully update room details')) {
        return;
      }
    },

    onMutate: async (data: any) => {
      /**Optimistic mutation */
      await queryClient.cancelQueries([QUERY_KEY.ROOM, roomId]);
      const previousData: any = queryClient.getQueryData([QUERY_KEY.ROOM, roomId]);
      queryClient.setQueryData([QUERY_KEY.ROOM, roomId], { ...previousData, ...data });
      return { previousData, newData: data };
    },
    onError: (_err: any, data: any, context: any) => {
      //revert back updates
      queryClient.setQueryData([QUERY_KEY.ROOM, roomId], context.previousData);
      handleCallFailure(_err.message);
    },
    onSettled: () => {
      //after login, refetch get my account
      queryClient.invalidateQueries([QUERY_KEY.ROOM, roomId]);
      queryClient.invalidateQueries(QUERY_KEY.ROOMS_FLOOR_PLAN);
    },
  });
};

export const useRoomSummaryData = () => {
  const dispatch = useAppDispatch();
  const { isConnected } = useContext(InternetConnectivityContext);
  const initialData = useAppSelector(selectRoomSummary);
  const mainDateView = useAppSelector(selectMainBookingDateView);

  return useQuery(
    [QUERY_KEY.ROOM_SUMMARY, mainDateView],
    ({ queryKey }) => bookingService.getRoomSummary(queryKey[1]),
    {
      onSuccess: (res: any) => {
        if (!validateAfterCall(res)) {
          // throw error message
          return;
        }
        dispatch(setRoomSummary(res)); //save to cache
      },
      onError: (res: any) => {
        handleCallFailure(res.message);
      },
      enabled: isConnected, //only call when there's internet
      initialData, //use cached or default data
    }
  );
};

export const useAvailableRoomsData = (isEditMode = false) => {
  const { isConnected } = useContext(InternetConnectivityContext);

  return useQuery(
    QUERY_KEY.AVAIL_ROOMS,
    !isEditMode ? () => bookingService.getAvailableRooms() : () => bookingService.getAllRooms(),
    {
      onSuccess: (res: any) => {
        if (!validateAfterCall(res)) {
          // throw error message
          return;
        }
      },
      onError: (res: any) => {
        handleCallFailure(res.message);
      },
      initialData: [],
      enabled: isConnected, //only call when there's internet
    }
  );
};
