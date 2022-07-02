import axios from 'axios';
import { env } from 'process';

const client = (() => axios.create({ baseURL: env.BANDS_URL }))();

const resolver = {
  Query: {
    bands: async (_, { limit = 5, offset = 0, filter = '' }) => client.get('', { params: { limit, offset, filter } }),
    band: async (_, { id }) => client.get(id),
  },
  Mutation: {
    createBand: async (_, { args }, { token }) => client.post('', args, {
      headers: {
        Authorization: token,
      },
    }),
    updateBand: async (_, { id, args }, { token }) => client.put(id, args, {
      headers: {
        Authorization: token,
      },
    }),
    deleteBand: async (_, { id }, { token }) => client.delete(id, {
      headers: {
        Authorization: token,
      },
    }),
  },
};

export default resolver;
