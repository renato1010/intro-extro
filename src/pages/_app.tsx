import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Shell } from "@components/shell";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Shell>
        <Component {...pageProps} />
      </Shell>
    </ChakraProvider>
  );
}

export default MyApp;
