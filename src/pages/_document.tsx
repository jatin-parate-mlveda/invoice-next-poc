import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          id='crisp'
          strategy='beforeInteractive'
          type='text/javascript'
          dangerouslySetInnerHTML={{
            __html: `
              window.$crisp = [];
              window.CRISP_WEBSITE_ID = '9a70b14e-b8db-48b2-8773-95eb66b91cee';
              (function IIF() {
                const d = document;
                const s = d.createElement('script');
                s.src = 'https://client.crisp.chat/l.js';
                d.getElementsByTagName('head')[0].appendChild(s);
                window.$crisp.push(['set', 'session:segments', [['invoicehero']]]);
                window.$crisp.push(['set', 'session:data', ['storename', new URLSearchParams(window.location.search).get('shop')]]);
              })();
            `,
            }}
          />
      </body>
    </Html>
  );
}
