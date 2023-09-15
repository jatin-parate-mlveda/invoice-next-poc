import {
  lazy,
  // Suspense,
  useLayoutEffect,
} from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAppBridge } from '@shopify/app-bridge-react';
// import LoadingCom from '../../components/LoadingCom';
import { fetchAnalytics } from '../services/api.service';

const AnalyticsPage = lazy(() => import(/* webpackPrefetch: true */ './Index'));

export default function SuspendedAnalyticsPage() {
  const queryClient = useQueryClient();
  const appInstance = useAppBridge();
  useLayoutEffect(() => {
    queryClient.prefetchQuery(['analytics'], () => fetchAnalytics(appInstance));
  }, [appInstance, queryClient]);

  return (
    // <Suspense fallback={<LoadingCom />}>
    <AnalyticsPage />
    // </Suspense>
  );
}
