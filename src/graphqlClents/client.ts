// import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
const httpLink = createHttpLink({
  uri: "https://y198pfm2ck.execute-api.us-east-1.amazonaws.com/development/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization:
        "Bearer" +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzYzMWMzYTEyZGY2ODk1Y2I5MGE0YSIsImVtYWlsIjoibW9uaXIyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc19yZWdpc3RlcmVkIjp0cnVlLCJpYXQiOjE2ODY3OTk5ODgsImV4cCI6MTY4NzQwNDc4OH0.KE6Ri3eSJbEEiHpuiFxcqLZ5BrdSc9IkGXc-lYzqEpI",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Client for Pagination and sorting data

// const client = new ApolloClient({
//   uri: "https://rickandmortyapi.com/graphql",
//   cache: new InMemoryCache(),
// });

export default client;
