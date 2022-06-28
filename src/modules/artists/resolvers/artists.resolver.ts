import axios from 'axios';
import { env } from 'process';

const resolver = {
  Query: {
    artists: async () => {
      const { data } = await axios.get(env.ARTISTS_URL);

      return data.items;
    },
    artist: async (parent, { _id }) => {
      const { data } = await axios.get(`${env.ARTISTS_URL}/${_id}`);
      return data;
    },
  },
};

export default resolver;
