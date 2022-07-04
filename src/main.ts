import { ApolloServer } from 'apollo-server';
import 'dotenv/config';
import schemaWithMiddleware from './services/schema';

const server = new ApolloServer({
  csrfPrevention: true,
  cache: 'bounded',
  schema: schemaWithMiddleware,
  context: ({ req }) => ({ token: req.headers.authorization || '' }),
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

// import { ApolloServer } from 'apollo-server-express';
// import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
// import * as express from 'express';
// import * as http from 'http';

// async function startApolloServer(schema) {
//   const app = express();
//   const httpServer = http.createServer(app);
//   const server = new ApolloServer({
//     schema,
//     csrfPrevention: true,
//     cache: 'bounded',
//     plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
//   });
//   await server.start();
//   server.applyMiddleware({ app });
//   await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
//   console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
// }
// startApolloServer(schemaWithMiddleware);
