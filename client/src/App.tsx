import Header from './components/Header';
import Clients from './components/Clients';
import AddClientModal from './components/AddClientModal';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Projects from './components/Projects';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge({} = {}, incoming) {
            return incoming;
          },
        },
        projects: {
          merge({} = {}, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div>
          <AddClientModal />
          <Projects />
          <Clients />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
