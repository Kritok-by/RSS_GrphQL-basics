import { ApolloServer } from 'apollo-server';
import 'dotenv/config';
import schemaWithMiddleware from './services/schema';

const server = new ApolloServer({
  csrfPrevention: true,
  cache: 'bounded',
  schema: schemaWithMiddleware,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
