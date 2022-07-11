import axios from 'axios';
import { env } from 'process';
import getAnyByID from '../../shared/getAnyByID';

const client = (() => axios.create({ baseURL: env.ALBUMS_URL }))();

const resolver = {
  Query: {
    albums: (_, { limit = 5, offset = 0, filter = '' }) => client.get('', { params: { limit, offset, filter } }),
    album: (_, { id }) => client.get(id),
  },
  Album: {
    artists: ({ artists }) => getAnyByID(artists, 'artists'),
    bands: ({ bands }) => getAnyByID(bands, 'bands'),
    tracks: ({ tracks }) => getAnyByID(tracks, 'bands'),
    genres: ({ genres }) => getAnyByID(genres, 'genres'),
  },
  Mutation: {
    createAlbum: (_, { args }, { token }) => client.post('', args, {
      headers: {
        Authorization: token,
      },
    }),
    updateAlbum: (_, { id, args }, { token }) => client.put(id, args, {
      headers: {
        Authorization: token,
      },
    }),
    deleteAlbum: (_, { id }, { token }) => client.delete(id, {
      headers: {
        Authorization: token,
      },
    }),
  },
};

export default resolver;
