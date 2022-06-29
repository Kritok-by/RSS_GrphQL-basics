import axios from 'axios';
import { env } from 'process';

const resolver = {
  Query: {
    user: async (parent, { _id }) => {
      const { data } = await axios.get(`${env.USER_URL}${_id}`);
      return data;
    },
  },
  Mutation: {
    login: async (parent, args) => {
      try {
        const { data } = await axios.post(`${env.USER_URL}login`, args);
        process.env.JWT = data.jwt;
        return data;
      } catch (e) {
        return e;
      }
    },
    register: async (parent, args) => {
      try {
        const { data } = await axios.post(`${env.USER_URL}register`, args);
        return data;
      } catch (e) {
        return e;
      }
      // return res?.data;
    },
  },
};

export default resolver;
