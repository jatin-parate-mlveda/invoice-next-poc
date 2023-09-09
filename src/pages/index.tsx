import DashboardLoadingCom from '@/components/home/LoadingScreen';
import { Suspense } from 'react';
import AppQueryClientProvider from '@/contexts/react-query.context';
import dynamic from 'next/dynamic';
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';

const DashboardPageDynamic = dynamic(() => import('@/components/home/Index'), {
  ssr: false,
  loading: () => <DashboardLoadingCom />
});

function DashboardPage() {
  return (
    <AppQueryClientProvider>
      <AppProvider i18n={enTranslations}>
        <Suspense fallback={<DashboardLoadingCom />}>
          <DashboardPageDynamic />
        </Suspense>
      </AppProvider>
    </AppQueryClientProvider>
  );
}

export default DashboardPage;
