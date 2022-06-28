import { mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

const resolverFiles = loadFilesSync('./**/**/*.resolver.ts');

const resolvers = mergeResolvers(resolverFiles);

export default resolvers;
