import { NextPage } from "next";
import React from "react";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-components";

import { App } from "../components/App";
import fetch from 'isomorphic-fetch'

const httpLink = createHttpLink({ uri: 'http://localhost:8080/graphql', fetch: fetch });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink
});

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

Home.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers["user-agent"] || "" : navigator.userAgent;
  return { userAgent };
};

export default Home;
