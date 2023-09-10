import { AppBridgeProvider } from '@/components/AppBridgeProvider';
import AppQueryClientProvider from '@/contexts/react-query.context';
import '@/styles/globals.css';
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import { NavigationMenu } from '@shopify/app-bridge-react';
import type { AppProps } from 'next/app';
import { useReportWebVitals } from 'next/web-vitals';
import dynamic from 'next/dynamic';
import RoutePropagator from '@/components/RoutePropagator';
import type { LinkLikeComponent } from '@shopify/polaris/build/ts/src/utilities/link';
import Link from 'next/link';

const CustomLinkComponent: LinkLikeComponent = ({
  as,
  children,
  url,
  external,
  role,
  ...rest
}) => {
  if (external) {
    return (
      <a href={url} target='_blank' rel='noopener noreferrer' {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link passHref href={url}>
      {children}
    </Link>
  );
};

const AppNavigationMenu = dynamic(
  () => import('@/components/AppNavigationMenu'),
  { ssr: false },
);

export default function App({ Component, pageProps }: AppProps) {
  useReportWebVitals(metric => {
    console.log(metric);
  });

  return (
    <>
      {/* <CrispWithNoSSR /> */}
      <AppQueryClientProvider>
        <AppProvider i18n={enTranslations} linkComponent={CustomLinkComponent}>
          <AppBridgeProvider>
            <RoutePropagator />
            <Component {...pageProps} />
            <AppNavigationMenu />
          </AppBridgeProvider>
        </AppProvider>
      </AppQueryClientProvider>
    </>
  );
}
