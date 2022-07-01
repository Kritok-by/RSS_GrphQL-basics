import axios from 'axios';
import { env } from 'process';

const client = (() => axios.create({ baseURL: env.GENRES_URL }))();

const resolver = {
  Query: {
    genres: async (_, { limit = 5, offset = 0, filter = '' }) => client.get('', { params: { limit, offset, filter } }),
    genre: async (_, { id }) => client.get(id),
  },
  Mutation: {
    createGenre: async (_, { args }, { token }) => client.post('', { args }, {
      headers: {
        Authorization: token,
      },
    }),
    updateGenre: async (_, { id, args }, { token }) => client.put(id, args, {
      headers: {
        Authorization: token,
      },
    }),
    deleteGenre: async (_, { id }, { token }) => client.delete(id, {
      headers: {
        Authorization: token,
      },
    }),
  },
};

export default resolver;
