import { makeExecutableSchema } from '@graphql-tools/schema';
import { applyMiddlewareToDeclaredResolvers } from 'graphql-middleware';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

const wrongOutputKeys = {
  _id: 'id',
  bandsIds: 'bands',
  userId: 'id',
  genresIds: 'genres',
  artistsIds: 'artists',
  trackIds: 'tracks',
};

const wrongInputKeys = Object.fromEntries(
  Object.entries(wrongOutputKeys)
    .map(([key, value]) => [value, key]),
);

const logResult = async (resolve, root, args, context, info) => {
  const middlewareArgs = args;
  try {
    if ('args' in args) {
      middlewareArgs.args = Object.fromEntries(
        Object.entries(args.args)
          .map(([key, value]) => [key in wrongInputKeys ? wrongInputKeys[key] : key, value]),
      );
    }
    console.log(args);

    const { data } = await resolve(root, middlewareArgs, context, info);

    if (data && 'jwt' in data) {
      process.env.JWT = data.jwt;
    }
    console.log(data);

    if ('items' in data) {
      data.items = data.items.map((item) => Object.fromEntries(
        Object.entries(item)
          .map(([key, value]) => [key in wrongOutputKeys ? wrongOutputKeys[key] : key, value]),
      ));

      return data;
    }

    const changedArr = Object.fromEntries(
      Object.entries(data)
        .map(([key, value]) => [key in wrongOutputKeys ? wrongOutputKeys[key] : key, value]),
    );
    return changedArr;
  } catch (e) {
    console.log(e);
    const { response: data } = e;
    if (data) {
      const [message] = data.message;
      throw new Error(message);
    }
    throw e.message;
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default applyMiddlewareToDeclaredResolvers(schema, logResult);
