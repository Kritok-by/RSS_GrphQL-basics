import { makeExecutableSchema } from '@graphql-tools/schema';
import { applyMiddlewareToDeclaredResolvers } from 'graphql-middleware';
import { processData, wrongInputKeys, wrongOutputKeys } from '../shared/dataProcess';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

const logResult = async (resolve, root, args, context, info) => {
  const middlewareArgs = args;
  try {
    if ('args' in args) {
      middlewareArgs.args = processData(args.args, wrongInputKeys);
    }

    const res = await resolve(root, middlewareArgs, context, info);

    const data = 'data' in res ? res.data : res;

    if ('items' in data) {
      data.items = data.items.map((item) => processData(item, wrongOutputKeys));
      return data;
    }

    if (!Array.isArray(data)) {
      return processData(data, wrongOutputKeys);
    }

    return data;
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
