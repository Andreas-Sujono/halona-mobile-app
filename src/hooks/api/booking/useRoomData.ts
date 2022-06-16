import { Id } from 'model';
import Toast from 'react-native-toast-message';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { bookingService } from 'Services/Api/booking/general';
import { QUERY_KEY } from '../queryKeys';

export const useAllRoomsData = (onSuccess?: any, onError?: any) => {
  return useQuery(QUERY_KEY.ROOMS, bookingService.getAllRooms, {
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

export const useFloorPlanData = (onSuccess?: any, onError?: any) => {
  return useQuery(QUERY_KEY.ROOMS_FLOOR_PLAN, bookingService.getFloorPlan, {
    onSuccess: (res: any) => {
      if (res.errorCode) {
        console.log('error happens: ', res);
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
    initialData: [
      {
        id: 1,
        floorName: 'Lv1',
        rooms: [],
      },
    ],
  });
};

export const useRoomData = (roomId: Id, onSuccess?: any, onError?: any) => {
  return useQuery(
    [QUERY_KEY.ROOM, roomId],
    (context) => bookingService.getOneRoom(context.queryKey[1]),
    {
      onSuccess: (res: any) => {
        if (res.errorCode !== 0 && res.errorCode !== 200) {
          console.log('error happens: ', res);
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

export const useUpdateRoom = (roomId: Id) => {
  const queryClient = useQueryClient();

  return useMutation((data) => bookingService.updateRoom(roomId, data), {
    onSuccess: (res: any) => {
      if (res.error || res.errorCode) {
        console.log('error happens: ', res);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: res.message,
        });
      } else {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'You have successfully update room details',
        });
      }
    },

    onMutate: async (data: any) => {
      /**Optimistic mutation */
      await queryClient.cancelQueries([QUERY_KEY.ROOM, roomId]);
      const previousData: any = queryClient.getQueryData([QUERY_KEY.ROOM, roomId]);
      queryClient.setQueryData([QUERY_KEY.ROOM, roomId], { ...previousData, ...data });
      return { previousData, newData: data };
    },
    onError: (_err, data: any, context: any) => {
      //revert back updates
      queryClient.setQueryData([QUERY_KEY.ROOM, roomId], context.previousData);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please try again!',
      });
    },
    onSettled: () => {
      //after login, refetch get my account
      queryClient.invalidateQueries([QUERY_KEY.ROOM, roomId]);
      queryClient.invalidateQueries(QUERY_KEY.ROOMS_FLOOR_PLAN);
    },
  });
};

export const useRoomSummaryData = () => {
  return useQuery(QUERY_KEY.ROOM_SUMMARY, bookingService.getRoomSummary);
};
