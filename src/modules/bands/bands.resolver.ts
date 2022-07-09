import axios from 'axios';
import { env } from 'process';
import getAnyByID from '../../shared/getAnyByID';

const client = (() => axios.create({ baseURL: env.BANDS_URL }))();

const resolver = {
  Query: {
    bands: (_, { limit = 5, offset = 0, filter = '' }) => client.get('', { params: { limit, offset, filter } }),
    band: (_, { id }) => client.get(id),
  },
  Band: {
    genres: ({ genres }) => getAnyByID(genres, 'genres'),
    members: async ({ members }) => {
      const res = await getAnyByID(members.map((i) => i.artist), 'artists');
      return members.map((item) => {
        const artist = res.find((i) => i.id === item.artist);
        return artist ? ({ ...item, ...artist }) : item;
      });
    },
  },
  Mutation: {
    createBand: (_, { args }, { token }) => client.post('', args, {
      headers: {
        Authorization: token,
      },
    }),
    updateBand: (_, { id, args }, { token }) => client.put(id, args, {
      headers: {
        Authorization: token,
      },
    }),
    deleteBand: (_, { id }, { token }) => client.delete(id, {
      headers: {
        Authorization: token,
      },
    }),
  },
};

export default resolver;
