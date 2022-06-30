import axios from 'axios';
import { env } from 'process';

const client = (() => axios.create({ baseURL: env.ARTISTS_URL }))();

const resolver = {
  Query: {
    artists: (_, { limit = 5, offset = 0, filter = '' }) => client.get('', { params: { limit, offset, filter } }),
    artist: async (_, { id }) => client.get(id),
  },
  Mutation: {
    createArtist: async (_, { ...args }) => client.post('', args, {
      headers: {
        Authorization: `Bearer ${process.env.JWT}`,
      },
    }),
    updateArtist: async (_, { id, args }) => client.put(id, args, {
      headers: {
        Authorization: `Bearer ${process.env.JWT}`,
      },
    }),
    deleteArtist: async (_, { id }) => client.delete(id, {
      headers: {
        Authorization: `Bearer ${process.env.JWT}`,
      },
    }),
  },
};

export default resolver;
