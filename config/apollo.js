import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import fetch from "node-fetch";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_BACKEND_URL,
    fetch,
  }),
});

export default client;
