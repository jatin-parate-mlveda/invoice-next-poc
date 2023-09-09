import { AppBridgeProvider } from '@/components/AppBridgeProvider';
import AppQueryClientProvider from '@/contexts/react-query.context';
import '@/styles/globals.css';
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import type { AppProps } from 'next/app';
import { useReportWebVitals } from 'next/web-vitals';

export default function App({ Component, pageProps }: AppProps) {
  useReportWebVitals(metric => {
    console.log(metric);
  });

  return (
    <>
      {/* <CrispWithNoSSR /> */}
      <AppQueryClientProvider>
        <AppProvider i18n={enTranslations}>
          <AppBridgeProvider>
            <Component {...pageProps} />
          </AppBridgeProvider>
        </AppProvider>
      </AppQueryClientProvider>
    </>
  );
}
