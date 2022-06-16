import { Id } from 'model';
import Toast from 'react-native-toast-message';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';
import { bookingService } from 'Services/Api/booking/general';
import { QUERY_KEY } from '../queryKeys';

export const useAllBookingsData = (onSuccess?: any, onError?: any) => {
  return useInfiniteQuery(
    QUERY_KEY.BOOKINGS,
    ({ pageParam = 0 }) => bookingService.getAllBookings(pageParam || 1),
    {
      getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.page + 1 : undefined),
      onSuccess: (res: any) => {
        console.log('res: ', res);
        if (res.errorCode) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: res.message,
          });
        }
      },
      onError,
      // select: data => {
      //   const superHeroNames = data.data.map(hero => hero.name)
      //   return superHeroNames
      // }
    }
  );
};

export const useBookingData = (bookingId: Id, onSuccess?: any, onError?: any) => {
  return useQuery(
    [QUERY_KEY.BOOKING, bookingId],
    (context) => bookingService.getOneBooking(context.queryKey[1]),
    {
      onSuccess: (res: any) => {
        if (res.errorCode) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: res.message,
          });
        }
      },
      onError,
      // select: data => {
      //   const superHeroNames = data.data.map(hero => hero.name)
      //   return superHeroNames
      // }
    }
  );
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => bookingService.createBooking(data), {
    // onSuccess: (res: any) => {
    // },

    onMutate: async (data: any) => {
      /**Optimistic mutation */
      await queryClient.cancelQueries(QUERY_KEY.BOOKINGS);
      const previousData: any = queryClient.getQueryData(QUERY_KEY.BOOKINGS);
      queryClient.setQueryData(QUERY_KEY.BOOKINGS, [data, ...previousData]);
      return { previousData, newData: data };
    },
    onError: (_err, data: any, context: any) => {
      //revert back updates
      queryClient.setQueryData(QUERY_KEY.BOOKINGS, context.previousData);

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please try again!',
      });
    },
    onSettled: () => {
      //after login, refetch get my account
      queryClient.invalidateQueries(QUERY_KEY.BOOKINGS);
    },
  });
};

export const useUpdateBooking = (bookingId: Id) => {
  const queryClient = useQueryClient();

  return useMutation((data) => bookingService.updateBooking(bookingId, data), {
    // onSuccess: (res: any) => {
    // },

    onMutate: async (data: any) => {
      /**Optimistic mutation */
      await queryClient.cancelQueries([QUERY_KEY.BOOKING, bookingId]);
      const previousData: any = queryClient.getQueryData([QUERY_KEY.BOOKING, bookingId]);
      queryClient.setQueryData([QUERY_KEY.BOOKING, bookingId], { ...previousData, ...data });
      return { previousData, newData: data };
    },
    onError: (_err, data: any, context: any) => {
      //revert back updates
      queryClient.setQueryData([QUERY_KEY.BOOKING, bookingId], context.previousData);
      queryClient.invalidateQueries(QUERY_KEY.BOOKINGS);

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please try again!',
      });
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

  return useMutation(() => bookingService.deleteBooking(bookingId), {
    // onSuccess: (res: any) => {
    // },

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
    onError: (_err, data: any, context: any) => {
      //revert back updates
      queryClient.setQueryData(QUERY_KEY.BOOKINGS, context.previousData);

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please try again!',
      });
    },
    onSettled: () => {
      //after login, refetch get my account
      queryClient.invalidateQueries(QUERY_KEY.BOOKINGS);
    },
  });
};

export const useCheckInBooking = (bookingIdInitial: Id) => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: { bookingId: Id }) => bookingService.checkInBooking(data.bookingId || bookingIdInitial),
    {
      // onSuccess: (res: any) => {
      // },

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
      onError: (_err, data: any, context: any) => {
        //revert back updates
        queryClient.setQueryData([QUERY_KEY.BOOKING, bookingIdInitial], context.previousData);

        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Please try again!',
        });
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

  return useMutation(
    (data: { bookingId: Id }) => bookingService.checkOutBooking(data.bookingId || bookingIdInitial),
    {
      // onSuccess: (res: any) => {
      // },

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
      onError: (_err, data: any, context: any) => {
        //revert back updates
        queryClient.setQueryData([QUERY_KEY.BOOKING, bookingIdInitial], context.previousData);

        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Please try again!',
        });
      },
      onSettled: () => {
        //after login, refetch get data
        queryClient.invalidateQueries([QUERY_KEY.BOOKING, bookingIdInitial]);
      },
    }
  );
};
