import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

const typesArray = loadFilesSync('./**/**/*.graphql');
const typeDefs = mergeTypeDefs(typesArray);

export default typeDefs;
