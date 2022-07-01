import axios from 'axios';
import { env } from 'process';

const client = (() => axios.create({ baseURL: env.ALBUMS_URL }))();

const resolver = {
  Query: {
    albums: async (_, { limit = 5, offset = 0, filter = '' }) => client.get('', { params: { limit, offset, filter } }),
    album: async (_, { id }) => client.get(id),
  },
  Mutation: {
    createAlbum: async (_, { args }, { token }) => client.post('', args, {
      headers: {
        Authorization: token,
      },
    }),
    updateAlbum: async (_, { id, args }, { token }) => client.put(id, args, {
      headers: {
        Authorization: token,
      },
    }),
    deleteAlbum: async (_, { id }, { token }) => client.delete(id, {
      headers: {
        Authorization: token,
      },
    }),
  },
};

export default resolver;
