import { useState } from 'react';
import { AppProps } from 'next/app';
import { getCookie, setCookies } from 'cookies-next';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider, AppShell } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
// import { useColorScheme } from '@mantine/hooks';
import { GlobalSpinner } from '@/components/GlobalSpinner';
import { LoadingProvider } from '@/lib/client';
import AppHeader from '@/components/AppHeader';
// import type { NextComponentType } from 'next'

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    (getCookie('mantine-color-scheme') as ColorScheme) || 'light'
  );

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookies('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <>
      <Head>
        <title>E-Commerce App</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <LoadingProvider>
              <GlobalSpinner />
              <AppShell
                header={
                  <AppHeader
                    {...pageProps}
                    tabs={[
                      {
                        title: 'Home',
                        url: '/',
                      },
                    ]}
                  />
                }
              >
                <Component {...pageProps} />
              </AppShell>
            </LoadingProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
