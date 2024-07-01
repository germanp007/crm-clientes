import { ApolloProvider } from "@apollo/client";
import client from "../config/apollo";
import "../styles/globals.css";
import LoginFake from "../components/LoginFake";
function MyApp({ Component, pageProps }) {
  return (
    // <LoginFake />
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
