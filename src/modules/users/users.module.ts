import { gql } from 'apollo-server';
import axios from 'axios';
import { env } from 'process';

export const typeDefs = gql`
  type User {
      _id: ID!
      firstName: String
      secondName: String
      middleName: String
      password: String
      email: String
  }

  type Query {
    register: [Artist],
    user(_id: ID!): User,
    login(email: String!, password: String!),
    verify: String
  }
`;

export const resolver = {
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
