import { selectAllBookings } from './../../../Store/Selector/booking/general';
import { InternetConnectivityContext } from 'Context/useInternetConnectivity';
import { setAllBookings } from './../../../Store/Actions/booking/general/general';
import { useAppDispatch, useAppSelector } from './../../../Store/index';
import { Id } from 'model';
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query';
import { bookingService } from 'Services/Api/booking/general';
import { QUERY_KEY } from '../queryKeys';
import { handleCallFailure, useWrappedMutation, validateAfterCall } from '../utils';
import { useContext } from 'react';

export const useAllBookingsData = (searchText = '') => {
  const dispatch = useAppDispatch();
  const { isConnected } = useContext(InternetConnectivityContext);
  const initialData = useAppSelector(selectAllBookings);

  return useInfiniteQuery(
    [QUERY_KEY.BOOKINGS, searchText],
    ({ pageParam = 0, queryKey }) => bookingService.getAllBookings(pageParam || 1, 25, queryKey[1]),
    {
      getNextPageParam: (lastPage) => (lastPage?.hasNextPage ? lastPage.page + 1 : undefined),
      onSuccess: (res: any) => {
        if (!validateAfterCall(res)) {
          // throw error message
          return;
        }
        dispatch(setAllBookings(res)); //save to cache
      },
      onError: (res: any) => {
        handleCallFailure(res.message);
      },
      enabled: isConnected, //only call when there's internet
      initialData, //use cached or default data
    }
  );
};

export const useBookingData = (bookingId: Id) => {
  const { isConnected } = useContext(InternetConnectivityContext);
  return useQuery(
    [QUERY_KEY.BOOKING, bookingId],
    (context) => bookingService.getOneBooking(context.queryKey[1]),
    {
      onSuccess: (res: any) => {
        if (!validateAfterCall(res)) {
          return;
        }
      },
      onError: (res: any) => {
        handleCallFailure(res.message);
      },
      enabled: isConnected, //only call when there's internet
      initialData: null,
    }
  );
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useWrappedMutation((data: any) => bookingService.createBooking(data), {
    onSuccess: (res: any) => {
      if (!validateAfterCall(res, true, true, 'Success creating booking')) {
        return;
      }
    },

    onMutate: async () => {
      await queryClient.cancelQueries(QUERY_KEY.BOOKINGS);
      const previousData: any = queryClient.getQueryData(QUERY_KEY.BOOKINGS);
      return { previousData };
    },
    onError: (_err: any, data: any, context: any) => {
      //revert back updates
      queryClient.setQueryData(QUERY_KEY.BOOKINGS, context.previousData);
      handleCallFailure(_err.message);
    },
    onSettled: () => {
      //after login, refetch get my account
      queryClient.invalidateQueries(QUERY_KEY.BOOKINGS);
    },
  });
};

export const useUpdateBooking = (bookingId: Id) => {
  const queryClient = useQueryClient();

  return useWrappedMutation((data: any) => bookingService.updateBooking(bookingId, data), {
    onSuccess: (res: any) => {
      if (!validateAfterCall(res, true, true, 'Success updating booking')) {
        return;
      }
    },

    onMutate: async (data: any) => {
      /**Optimistic mutation */
      await queryClient.cancelQueries([QUERY_KEY.BOOKING, bookingId]);
      const previousData: any = queryClient.getQueryData([QUERY_KEY.BOOKING, bookingId]);
      queryClient.setQueryData([QUERY_KEY.BOOKING, bookingId], { ...previousData, ...data });
      return { previousData, newData: data };
    },
    onError: (_err: any, data: any, context: any) => {
      //revert back updates
      queryClient.setQueryData([QUERY_KEY.BOOKING, bookingId], context.previousData);
      queryClient.invalidateQueries(QUERY_KEY.BOOKINGS);
      handleCallFailure(_err.message);
    },
    onSettled: () => {
      //after login, refetch get my account
      queryClient.invalidateQueries([QUERY_KEY.BOOKING, bookingId]);
      queryClient.invalidateQueries(QUERY_KEY.BOOKINGS);
    },
  });
};

export const useDeleteBooking = (bookingId: Id) => {
  const queryClient = useQueryClient();

  return useWrappedMutation(() => bookingService.deleteBooking(bookingId), {
    onSuccess: (res: any) => {
      if (!validateAfterCall(res, true, true, 'Success deleting booking')) {
        return;
      }
    },

    onMutate: async () => {
      /**Optimistic mutation */
      await queryClient.cancelQueries([QUERY_KEY.BOOKING, bookingId]);
      await queryClient.cancelQueries(QUERY_KEY.BOOKINGS);
      queryClient.setQueryData([QUERY_KEY.BOOKING, bookingId], null);

      const previousBookings: any = queryClient.getQueryData(QUERY_KEY.BOOKINGS);
      queryClient.setQueryData(
        QUERY_KEY.BOOKINGS,
        previousBookings.filter((item: any) => item.id !== bookingId)
      );

      return { previousData: previousBookings };
    },
    onError: (_err: any, data: any, context: any) => {
      //revert back updates
      queryClient.setQueryData(QUERY_KEY.BOOKINGS, context.previousData);
      handleCallFailure(_err.message);
    },
    onSettled: () => {
      //after login, refetch get my account
      queryClient.invalidateQueries(QUERY_KEY.BOOKINGS);
    },
  });
};

export const useCheckInBooking = (bookingIdInitial: Id) => {
  const queryClient = useQueryClient();

  return useWrappedMutation(
    (data: { bookingId: Id }) => bookingService.checkInBooking(data.bookingId || bookingIdInitial),
    {
      onSuccess: (res: any) => {
        if (!validateAfterCall(res, true, true, 'Success check in')) {
          return;
        }
      },

      onMutate: async (data: any) => {
        /**Optimistic mutation */
        await queryClient.cancelQueries([QUERY_KEY.BOOKING, bookingIdInitial]);
        const previousData: any = queryClient.getQueryData([QUERY_KEY.BOOKING, bookingIdInitial]);
        queryClient.setQueryData([QUERY_KEY.BOOKING, bookingIdInitial], {
          ...previousData,
          ...data,
        });
        return { previousData, newData: data };
      },
      onError: (_err: any, data: any, context: any) => {
        //revert back updates
        queryClient.setQueryData([QUERY_KEY.BOOKING, bookingIdInitial], context.previousData);
        handleCallFailure(_err.message);
      },
      onSettled: () => {
        //after login, refetch get data
        queryClient.invalidateQueries([QUERY_KEY.BOOKING, bookingIdInitial]);
      },
    }
  );
};

export const useCheckOutBooking = (bookingIdInitial: Id) => {
  const queryClient = useQueryClient();

  return useWrappedMutation(
    (data: { bookingId: Id }) => bookingService.checkOutBooking(data.bookingId || bookingIdInitial),
    {
      onSuccess: (res: any) => {
        if (!validateAfterCall(res, true, true, 'Success check out')) {
          return;
        }
      },

      onMutate: async (data: any) => {
        /**Optimistic mutation */
        await queryClient.cancelQueries([QUERY_KEY.BOOKING, bookingIdInitial]);
        const previousData: any = queryClient.getQueryData([QUERY_KEY.BOOKING, bookingIdInitial]);
        queryClient.setQueryData([QUERY_KEY.BOOKING, bookingIdInitial], {
          ...previousData,
          ...data,
        });
        return { previousData, newData: data };
      },
      onError: (_err: any, data: any, context: any) => {
        //revert back updates
        queryClient.setQueryData([QUERY_KEY.BOOKING, bookingIdInitial], context.previousData);
        handleCallFailure(_err.message);
      },
      onSettled: () => {
        //after login, refetch get data
        queryClient.invalidateQueries([QUERY_KEY.BOOKING, bookingIdInitial]);
      },
    }
  );
};

export const usePendingRoomBookingData = () => {
  const { isConnected } = useContext(InternetConnectivityContext);
  return useQuery(QUERY_KEY.PENDING_ROOM_BOOKINGS, () => bookingService.getPendingRoomBookings(), {
    onSuccess: (res: any) => {
      if (!validateAfterCall(res)) {
        return;
      }
    },
    onError: (res: any) => {
      handleCallFailure(res.message);
    },
    enabled: isConnected, //only call when there's internet
    initialData: [],
  });
};

export const useFutureBookingData = () => {
  const { isConnected } = useContext(InternetConnectivityContext);
  return useQuery(QUERY_KEY.FUTURE_BOOKINGS, () => bookingService.getFutureBookings(), {
    onSuccess: (res: any) => {
      if (!validateAfterCall(res)) {
        return;
      }
    },
    onError: (res: any) => {
      handleCallFailure(res.message);
    },
    enabled: isConnected, //only call when there's internet
    initialData: [],
  });
};

export const useTodayBookingData = () => {
  const { isConnected } = useContext(InternetConnectivityContext);
  return useQuery(QUERY_KEY.TODAY_BOOKINGS, () => bookingService.getTodayBookings(), {
    onSuccess: (res: any) => {
      if (!validateAfterCall(res)) {
        return;
      }
    },
    onError: (res: any) => {
      handleCallFailure(res.message);
    },
    enabled: isConnected, //only call when there's internet
    initialData: [],
  });
};

export const useSendReceiptBooking = (bookingIdInitial: Id) => {
  return useWrappedMutation(
    (data: { bookingId: Id }) => bookingService.sendReceipt(data.bookingId || bookingIdInitial),
    {
      onSuccess: (res: any) => {
        if (!validateAfterCall(res, true, true, 'Success sending receipt')) {
          return;
        }
      },

      onError: (_err: any) => {
        //revert back updates
        handleCallFailure(_err.message);
      },
      onSettled: () => {},
    }
  );
};
