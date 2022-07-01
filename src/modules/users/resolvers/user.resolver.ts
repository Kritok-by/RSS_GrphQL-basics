import axios from 'axios';
import { env } from 'process';

const client = (() => axios.create({ baseURL: env.USER_URL }))();

const resolver = {
  Query: {
    user: (parent, { id }) => client.get(id),
    jwt: (parent, args) => client.post('login', args),
  },
  Mutation: {
    register: (parent, args) => client.post('register', args),
  },
};

export default resolver;
