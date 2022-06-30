import axios from 'axios';
import { env } from 'process';

const client = (() => axios.create({baseURL: env.ALBUMS_URL}))();

const resolver = {
  Query: {
    albums: async (_, {limit = 5, offset = 0, filter = ''}) => {
      const { data } = await client.get('',{params:{limit, offset, filter}});
      return data;
    },
    album: async (_, { _id }) => {
      const { data } = await client.get(_id);
      return data;
    },
  },
  Mutation: {
    createAlbum: async (_, args) => {
      const { data } = await client.post('', args, {
        headers: {
          Authorization: `Bearer ${process.env.JWT}`,
        },
      });
      return data;
    },
    updateAlbum: async (_, { id, args }) => {
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
    deleteAlbum: async (_, { id }) => {
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
