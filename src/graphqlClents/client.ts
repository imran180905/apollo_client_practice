import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://y198pfm2ck.execute-api.us-east-1.amazonaws.com/development/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzYzMWMzYTEyZGY2ODk1Y2I5MGE0YSIsImVtYWlsIjoibW9uaXIyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc19yZWdpc3RlcmVkIjp0cnVlLCJpYXQiOjE2ODc0MDYzODMsImV4cCI6MTY4ODAxMTE4M30.yKQXQOw1AHVp8MdBqD_sFa0wyG8-NgVW2dsEws5PkAo`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
