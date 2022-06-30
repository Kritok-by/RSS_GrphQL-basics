import axios from 'axios';
import { env } from 'process';

const resolver = {
  Query: {
    artists: async () => {
      const { data } = await axios.get(env.ARTISTS_URL);
      return data;
    },
    artist: async (_, { _id }) => {
      const { data } = await axios.get(`${env.ARTISTS_URL}${_id}`);
      return data;
    },
  },
  Mutation: {
    create: async (_, args) => {
      const { data } = await axios.post(`${env.ARTISTS_URL}`, args, {
        headers: {
          Authorization: `Bearer ${process.env.JWT}`,
        },
      });
      return data;
    },
    update: async (_, { id, args }) => {
      try {
        const { data } = await axios.put(`${env.ARTISTS_URL}${id}`, args, {
          headers: {
            Authorization: `Bearer ${process.env.JWT}`,
          },
        });
        console.log(data);
        return data;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
    delete: async (_, { id }) => {
      try {
        const { data } = await axios.delete(`${env.ARTISTS_URL}${id}`, {
          headers: {
            Authorization: `Bearer ${process.env.JWT}`,
          },
        });
        console.log(data);
        return data;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};

export default resolver;
