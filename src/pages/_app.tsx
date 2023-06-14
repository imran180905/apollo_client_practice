import client from "@/graphqlClents/client";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client} children={undefined}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
