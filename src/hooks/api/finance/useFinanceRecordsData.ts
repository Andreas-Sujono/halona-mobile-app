import { setFinanceSummary } from './../../../Store/Actions/finance/general/general';
import { selectFinanceSummary } from './../../../Store/Selector/finance/general';
import { InternetConnectivityContext } from 'Context/useInternetConnectivity';
import { useContext } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { financeService } from 'Services/Api/finance/general';
import { useAppDispatch, useAppSelector } from 'Store';
import { QUERY_KEY } from '../queryKeys';
import { validateAfterCall, handleCallFailure, useWrappedMutation } from '../utils';
import { Id } from 'model';

export const useFinanceSummaryThisMonthData = () => {
  const dispatch = useAppDispatch();
  const { isConnected } = useContext(InternetConnectivityContext);
  const initialData = useAppSelector(selectFinanceSummary);

  return useQuery(QUERY_KEY.FINANCE_SUMMARY_THIS_MONTH, financeService.getFinanceSummaryThisMonth, {
    onSuccess: (res: any) => {
      if (!validateAfterCall(res)) {
        // throw error message
        return;
      }
      dispatch(setFinanceSummary(res));
    },
    onError: (res: any) => {
      handleCallFailure(res.message);
    },
    initialData: initialData,
    enabled: isConnected, //only call when there's internet
  });
};

export const useAllFinanceRecordsData = () => {
  const { isConnected } = useContext(InternetConnectivityContext);
  return useQuery(QUERY_KEY.ALL_FINANCE_RECORDS, () => financeService.getAllFinanceRecords(), {
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

export const useFinanceRecordData = (recordId: Id) => {
  const { isConnected } = useContext(InternetConnectivityContext);
  return useQuery(
    [QUERY_KEY.FINANCE_RECORD, recordId],
    (context) => financeService.getOneFinanceRecord(context.queryKey[1]),
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

export const useCreateFinanceRecord = () => {
  const queryClient = useQueryClient();

  return useWrappedMutation((data: any) => financeService.createFinanceRecord(data), {
    onSuccess: (res: any) => {
      if (!validateAfterCall(res, true, true, 'Success creating record')) {
        return;
      }
    },

    onMutate: async () => {
      await queryClient.cancelQueries(QUERY_KEY.ALL_FINANCE_RECORDS);
      const previousData: any = queryClient.getQueryData(QUERY_KEY.ALL_FINANCE_RECORDS);
      return { previousData };
    },
    onError: (_err: any, data: any, context: any) => {
      //revert back updates
      queryClient.setQueryData(QUERY_KEY.ALL_FINANCE_RECORDS, context.previousData);
      handleCallFailure(_err.message);
    },
    onSettled: () => {
      //after login, refetch get my account
      queryClient.invalidateQueries(QUERY_KEY.ALL_FINANCE_RECORDS);
      queryClient.invalidateQueries(QUERY_KEY.FINANCE_SUMMARY_THIS_MONTH);
    },
  });
};

export const useUpdateFinanceRecord = (recordId: Id) => {
  const queryClient = useQueryClient();

  return useWrappedMutation((data: any) => financeService.updateFinanceRecord(recordId, data), {
    onSuccess: (res: any) => {
      if (!validateAfterCall(res, true, true, 'Success updating record')) {
        return;
      }
    },

    onMutate: async (data: any) => {
      /**Optimistic mutation */
      await queryClient.cancelQueries([QUERY_KEY.FINANCE_RECORD, recordId]);
      const previousData: any = queryClient.getQueryData([QUERY_KEY.FINANCE_RECORD, recordId]);
      queryClient.setQueryData([QUERY_KEY.FINANCE_RECORD, recordId], { ...previousData, ...data });
      return { previousData, newData: data };
    },
    onError: (_err: any, data: any, context: any) => {
      //revert back updates
      queryClient.setQueryData([QUERY_KEY.FINANCE_RECORD, recordId], context.previousData);
      queryClient.invalidateQueries(QUERY_KEY.ALL_FINANCE_RECORDS);
      handleCallFailure(_err.message);
    },
    onSettled: () => {
      //after login, refetch get my account
      queryClient.invalidateQueries([QUERY_KEY.FINANCE_RECORD, recordId]);
      queryClient.invalidateQueries(QUERY_KEY.ALL_FINANCE_RECORDS);
    },
  });
};

export const useDeleteFinanceRecord = (recordId: Id) => {
  const queryClient = useQueryClient();

  return useWrappedMutation(() => financeService.deleteFinanceRecord(recordId), {
    onSuccess: (res: any) => {
      if (!validateAfterCall(res, true, true, 'Success deleting record')) {
        return;
      }
    },

    onMutate: async () => {
      /**Optimistic mutation */
      await queryClient.cancelQueries([QUERY_KEY.FINANCE_RECORD, recordId]);
      await queryClient.cancelQueries(QUERY_KEY.ALL_FINANCE_RECORDS);
      queryClient.setQueryData([QUERY_KEY.FINANCE_RECORD, recordId], null);

      const previousFinanceRecords: any = queryClient.getQueryData(QUERY_KEY.ALL_FINANCE_RECORDS);
      queryClient.setQueryData(
        QUERY_KEY.ALL_FINANCE_RECORDS,
        previousFinanceRecords.filter((item: any) => item.id !== recordId)
      );

      return { previousData: previousFinanceRecords };
    },
    onError: (_err: any, data: any, context: any) => {
      //revert back updates
      queryClient.setQueryData(QUERY_KEY.ALL_FINANCE_RECORDS, context.previousData);
      handleCallFailure(_err.message);
    },
    onSettled: () => {
      //after login, refetch data
      queryClient.invalidateQueries(QUERY_KEY.ALL_FINANCE_RECORDS);
    },
  });
};
