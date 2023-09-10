import DashboardLoadingCom from '@/components/home/LoadingScreen';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const DashboardPageDynamic = dynamic(() => import('@/components/home/Index'), {
  ssr: false,
  loading: () => <DashboardLoadingCom />,
});

function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoadingCom />}>
      <DashboardPageDynamic />
    </Suspense>
  );
}

export default DashboardPage;
