import '@/styles/globals.css';
import type { AppProps } from 'next/app';
// import dynamic from 'next/dynamic';
import { useReportWebVitals } from 'next/web-vitals';

// const CrispWithNoSSR = dynamic(() => import('../components/CrispChat'), {
//   ssr: false,
// });

export default function App({ Component, pageProps }: AppProps) {
  useReportWebVitals(metric => {
    console.log(metric);
  });

  return (
    <>
      {/* <CrispWithNoSSR /> */}
      <Component {...pageProps} />
    </>
  );
}
