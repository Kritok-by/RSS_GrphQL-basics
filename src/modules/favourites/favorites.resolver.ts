import axios from 'axios';
import { env } from 'process';
import getAnyByID from '../../shared/getAnyByID';

const client = (() => axios.create({ baseURL: env.FAVORITES_URL }))();

const resolver = {
  Query: {
    favourites: async (_, args, { token }) => client.get('', {
      headers: {
        Authorization: token,
      },
    }),
  },
  Favourites: {
    artists: ({ artists }) => getAnyByID(artists, 'artists'),
    bands: ({ bands }) => getAnyByID(bands, 'bands'),
    tracks: ({ tracks }) => getAnyByID(tracks, 'bands'),
    genres: ({ genres }) => getAnyByID(genres, 'genres'),
  },
  Mutation: {
    addTrackToFavourites: async (_, { id }, { token }) => client.put('add', { id, type: 'tracks' }, {
      headers: {
        Authorization: token,
      },
    }),
    addBandToFavourites: async (_, { id }, { token }) => client.put('add', { id, type: 'bands' }, {
      headers: {
        Authorization: token,
      },
    }),
    addArtistToFavourites: async (_, { id }, { token }) => client.put('add', { id, type: 'artists' }, {
      headers: {
        Authorization: token,
      },
    }),
    addGenreToFavourites: async (_, { id }, { token }) => client.put('add', { id, type: 'genres' }, {
      headers: {
        Authorization: token,
      },
    }),
    removeTrackToFavourites: async (_, { id }, { token }) => client.put('remove', { id, type: 'tracks' }, {
      headers: {
        Authorization: token,
      },
    }),
    removeBandToFavourites: async (_, { id }, { token }) => client.put('remove', { id, type: 'bands' }, {
      headers: {
        Authorization: token,
      },
    }),
    removeArtistToFavourites: async (_, { id }, { token }) => client.put('remove', { id, type: 'artists' }, {
      headers: {
        Authorization: token,
      },
    }),
    removeGenreToFavourites: async (_, { id }, { token }) => client.put('remove', { id, type: 'genres' }, {
      headers: {
        Authorization: token,
      },
    }),
  },
};

export default resolver;
