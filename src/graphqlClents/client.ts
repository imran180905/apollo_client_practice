import { ApolloClient, InMemoryCache,createHttpLink } from "@apollo/client";
import {setContext} from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://y198pfm2ck.execute-api.us-east-1.amazonaws.com/development/graphql',
});

const authLink = setContext((_, { headers }) => {
  
  return {
    headers: {
      ...headers,
      authorization:  `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzYzMWMzYTEyZGY2ODk1Y2I5MGE0YSIsImVtYWlsIjoibW9uaXIyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc19yZWdpc3RlcmVkIjp0cnVlLCJpYXQiOjE2ODY3OTk2MTEsImV4cCI6MTY4NzQwNDQxMX0.JHxBr3ddkdp0_JJikWcfk9OgSqkZFRy_M-dBXp15XmM` ,
    }
  }
});

// const client = new ApolloClient({
//   // uri: "https://rickandmortyapi.com/graphql",
//   uri: "https://y198pfm2ck.execute-api.us-east-1.amazonaws.com/development/graphql",
//   cache: new InMemoryCache(),
// });

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;
