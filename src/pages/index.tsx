import DashboardLoadingCom from '@/components/home/LoadingScreen';
import { Suspense } from 'react';
import DashBoardPage from '@/components/home/Index';
import dynamic from 'next/dynamic';

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoadingCom />}>
      <DashBoardPage />
    </Suspense>
  );
}

DashboardPage.LoadingScreen = DashboardLoadingCom;
