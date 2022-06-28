import { ApolloServer } from 'apollo-server';
import 'dotenv/config';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
