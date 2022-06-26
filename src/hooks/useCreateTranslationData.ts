import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useCreateTranslationData = (createDataFunc: any) => {
  const { t } = useTranslation();
  return useMemo(() => {
    return createDataFunc(t);
  }, [t, createDataFunc]);
};
