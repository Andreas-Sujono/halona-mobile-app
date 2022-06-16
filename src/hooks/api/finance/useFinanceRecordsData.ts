import { Id } from 'model';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';
import { financeService } from 'Services/Api/finance/general';
import { QUERY_KEY } from '../queryKeys';

export const useFinanceSummaryThisMonthData = () => {
  return useQuery(QUERY_KEY.FINANCE_SUMMARY_THIS_MONTH, financeService.getFinanceSummaryThisMonth);
};
