import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";
import { AppProps } from "next/app";

import { Container } from "../components/Container";
import { Main } from "../components/Main";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {
  black: "#16161D",
};

const theme = extendTheme({ config, colors });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Container minH="100vh">
        <Main>
          <Component {...pageProps} />
        </Main>
      </Container>
    </ChakraProvider>
  );
}

export default MyApp;
