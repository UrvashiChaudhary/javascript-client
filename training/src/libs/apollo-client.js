// import/no-extraneous-dependencies
import { InMemoryCache } from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from '@apollo/client/link/context';

const link = new HttpLink({ uri: 'http://localhost:9001/graphql' });

const authLink = setContext((_, { headers }) => {
// get the authentication token if it's exists
  const token = localStorage.getItem('token');
  console.log('token', token);
  // return the headers to the context so httplink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const Apolloclient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link),
});

export default Apolloclient;
