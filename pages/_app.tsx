import type { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/lab";
import CssBaseline from "@mui/material/CssBaseline";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import DateAdapter from "@mui/lab/AdapterMoment";
import moment from "moment";
import { ReactQueryDevtools } from "react-query/devtools";
import "moment/locale/ru";

import createEmotionCache from "../src/createEmotionCache";
import theme from "../src/theme";

const clientSideEmotionCache = createEmotionCache();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps },
}: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>WareHouse</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={DateAdapter} locale={moment.locale("RU")}>
            <CssBaseline />
            <SessionProvider session={session}>
              <Component {...pageProps} />
              <Toaster />
            </SessionProvider>
          </LocalizationProvider>
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </CacheProvider>
  );
}

export default MyApp;
