import axios from 'axios';
import { env } from 'process';
import getAnyByID from '../../shared/getAnyByID';

const client = (() => axios.create({ baseURL: env.ARTISTS_URL }))();

const resolver = {
  Query: {
    artists: (_, { limit = 5, offset = 0, filter = '' }) => client.get('', { params: { limit, offset, filter } }),
    artist: async (_, { id }) => client.get(id),
  },
  Artist: {
    bands: ({ bands }) => getAnyByID(bands, 'bands'),
  },
  Mutation: {
    createArtist: async (_, { args }, { token }) => client.post('', args, {
      headers: {
        Authorization: token,
      },
    }),
    updateArtist: async (_, { id, args }, { token }) => client.put(id, args, {
      headers: {
        Authorization: token,
      },
    }),
    deleteArtist: async (_, { id }, { token }) => client.delete(id, {
      headers: {
        Authorization: token,
      },
    }),
  },
};

export default resolver;
