import axios from 'axios';
import { env } from 'process';

const client = (() => axios.create({baseURL: env.BANDS_URL}))();

const resolver = {
  Query: {
    favourites: async () => {
      const { data } = await client.get('', {
        headers: {
          Authorization: `Bearer ${process.env.JWT}`,
        },
      });
      return data;
    }
  },
  Mutation: {
    addTrackToFavourites: async (_, {id}) => {
      const { data } = await client.put('add', {id, type: 'tracks'}, {
        headers: {
          Authorization: `Bearer ${process.env.JWT}`,
        },
      });
      return data;
    },
    addBandToFavourites: async (_, {id}) => {
      const { data } = await client.put('add', {id, type: 'bands'}, {
        headers: {
          Authorization: `Bearer ${process.env.JWT}`,
        },
      });
      return data;
    },
    addArtistToFavourites: async (_, {id}) => {
      const { data } = await client.put('add', {id, type: 'artists'}, {
        headers: {
          Authorization: `Bearer ${process.env.JWT}`,
        },
      });
      return data;
    },
    addGenreToFavourites: async (_, {id}) => {
      const { data } = await client.put('add', {id, type: 'genres'}, {
        headers: {
          Authorization: `Bearer ${process.env.JWT}`,
        },
      });
      return data;
    },
    removeTrackToFavourites: async (_, {id}) => {
      const { data } = await client.put('remove', {id, type: 'tracks'}, {
        headers: {
          Authorization: `Bearer ${process.env.JWT}`,
        },
      });
      return data;
    },
    removeBandToFavourites: async (_, {id}) => {
      const { data } = await client.put('remove', {id, type: 'bands'}, {
        headers: {
          Authorization: `Bearer ${process.env.JWT}`,
        },
      });
      return data;
    },
    removeArtistToFavourites: async (_, {id}) => {
      const { data } = await client.put('remove', {id, type: 'artists'}, {
        headers: {
          Authorization: `Bearer ${process.env.JWT}`,
        },
      });
      return data;
    },
    removeGenreToFavourites: async (_, {id}) => {
      const { data } = await client.put('remove', {id, type: 'genres'}, {
        headers: {
          Authorization: `Bearer ${process.env.JWT}`,
        },
      });
      return data;
    },
  },
};

export default resolver;
