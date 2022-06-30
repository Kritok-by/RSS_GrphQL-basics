import axios from 'axios';
import { env } from 'process';

const client = (() => axios.create({ baseURL: env.TRACKS_URL }))();

const resolver = {
  Query: {
    tracks: async (_, { limit = 5, offset = 0, filter = '' }) => {
      const { data } = await client.get('', { params: { limit, offset, filter } });
      return data;
    },
    track: async (_, { _id }) => {
      const { data } = await client.get(_id);
      return data;
    },
  },
  Mutation: {
    createTrack: async (_, args) => {
      const { data } = await client.post('', args, {
        headers: {
          Authorization: `Bearer ${process.env.JWT}`,
        },
      });
      return data;
    },
    updateTrack: async (_, { id, args }) => {
      try {
        const { data } = await client.put(id, args, {
          headers: {
            Authorization: `Bearer ${process.env.JWT}`,
          },
        });

        return data;
      } catch (e) {
        return e;
      }
    },
    deleteTrack: async (_, { id }) => {
      try {
        const { data } = await client.delete(id, {
          headers: {
            Authorization: `Bearer ${process.env.JWT}`,
          },
        });

        return data;
      } catch (e) {
        return e;
      }
    },
  },
};

export default resolver;
