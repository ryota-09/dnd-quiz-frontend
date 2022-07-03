import "../styles/globals.css";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { initializeApollo } from "../lib/apolloClient";
import { GameStateProvider } from "../providers/gameStateProvider";

function MyApp({ Component, pageProps }: AppProps) {
  const client = initializeApollo();
  return (
    <ApolloProvider client={client}>
      <GameStateProvider>
        <Component {...pageProps} />
      </GameStateProvider>
    </ApolloProvider>
  );
}

export default MyApp;
