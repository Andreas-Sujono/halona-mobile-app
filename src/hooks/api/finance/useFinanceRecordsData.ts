import { setFinanceSummary } from './../../../Store/Actions/finance/general/general';
import { selectFinanceSummary } from './../../../Store/Selector/finance/general';
import { InternetConnectivityContext } from 'Context/useInternetConnectivity';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { financeService } from 'Services/Api/finance/general';
import { useAppDispatch, useAppSelector } from 'Store';
import { QUERY_KEY } from '../queryKeys';
import { validateAfterCall, handleCallFailure } from '../utils';

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
