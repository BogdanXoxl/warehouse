import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { QueryClient, QueryClientProvider } from "react-query";
import DateAdapter from "@mui/lab/AdapterMoment";
import { LocalizationProvider } from "@mui/lab";
import { ReactQueryDevtools } from "react-query/devtools";
import moment from "moment";

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
          <LocalizationProvider dateAdapter={DateAdapter} locale={moment.locale("ru")}>
            <CssBaseline />
            <SessionProvider session={session}>
              <Component {...pageProps} />
            </SessionProvider>
          </LocalizationProvider>
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </CacheProvider>
  );
}

export default MyApp;
