import { Id } from 'model';
import Toast from 'react-native-toast-message';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';
import { bookingService } from 'Services/Api/booking/general';
import { QUERY_KEY } from '../queryKeys';

export const useAllBookingsData = (onSuccess?: any, onError?: any) => {
  return useInfiniteQuery(QUERY_KEY.BOOKINGS, () => bookingService.getAllBookings(), {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    onSuccess: (res: any) => {
      if (res.errorCode !== 0 && res.errorCode !== 200) {
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
  });
};

export const useBookingData = (bookingId: Id, onSuccess?: any, onError?: any) => {
  return useQuery(
    [QUERY_KEY.BOOKING, bookingId],
    (context) => bookingService.getOneBooking(context.queryKey[1]),
    {
      onSuccess: (res: any) => {
        if (res.errorCode !== 0 && res.errorCode !== 200) {
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
      const previousData: any = queryClient.getQueryData([QUERY_KEY.ROOM, bookingId]);
      queryClient.setQueryData([QUERY_KEY.BOOKING, bookingId], { ...previousData, ...data });
      return { previousData, newData: data };
    },
    onError: (_err, data: any, context: any) => {
      //revert back updates
      queryClient.setQueryData([QUERY_KEY.BOOKING, bookingId], context.previousData);

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please try again!',
      });
    },
    onSettled: () => {
      //after login, refetch get my account
      queryClient.invalidateQueries([QUERY_KEY.BOOKING, bookingId]);
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
