import React from 'react';
import { Html, Head, Main, NextScript, DocumentProps } from 'next/document';

export default function _Document(props: DocumentProps) {
  return (
    <Html>
      <Head>
        <link rel="icon" href={`/favicon.ico`} type="image/x-icon" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, interactive-widget=resizes-content"></meta>
        <meta name="application-name" content="Blinko" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Blinko" />

        <link rel="apple-touch-icon" sizes="120x120" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icon-512x512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icon-512x512.png" />

        <meta name="description" content="Blinko self-hosted personal note" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#ffffff"/>

        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Blinko</title>

        <meta name="apple-mobile-web-app-status-bar-style" content="#ffffff"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
