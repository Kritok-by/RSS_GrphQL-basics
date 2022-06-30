import axios from 'axios';
import { env } from 'process';

const client = (() => axios.create({baseURL: env.USER_URL}))();

const resolver = {
  Query: {
    user: async (parent, { _id }) => {
      const { data } = await client.get(_id);
      return data;
    },
    jwt: async (parent, args) => {
      try {
        const { data } = await client.post(`login`, args);
        process.env.JWT = data.jwt;
        return data;
      } catch (e) {
        console.log(e)
        return e;
      }
    }
  },
  Mutation: {
    register: async (parent, args) => {
      try {
        const { data } = await client.post(`register`, args);
        return data;
      } catch (e) {
        return e;
      }
      // return res?.data;
    },
  },
};

export default resolver;
