import '@/styles/globals.css';
import { AppProvider } from '@shopify/polaris';
import type { AppProps } from 'next/app';
import { useReportWebVitals } from 'next/web-vitals';
import enTranslations from '@shopify/polaris/locales/en.json';

export default function App({ Component, pageProps }: AppProps) {
  useReportWebVitals(metric => {
    console.log(metric);
  });
  return (
    <AppProvider i18n={enTranslations}>
      <Component {...pageProps} />
    </AppProvider>
  );
}
