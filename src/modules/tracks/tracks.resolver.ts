import axios from 'axios';
import { env } from 'process';
import getAnyByID from '../../shared/getAnyByID';

const client = (() => axios.create({ baseURL: env.TRACKS_URL }))();

const resolver = {
  Query: {
    tracks: async (_, { limit = 5, offset = 0, filter = '' }) => client.get('', { params: { limit, offset, filter } }),
    track: async (_, { id }) => client.get(id),
  },
  Track: {
    bands: ({ bands }) => getAnyByID(bands, 'bands'),
    genres: ({ genres }) => getAnyByID(genres, 'genres'),
    album: async ({ album }) => {
      const albumData = await getAnyByID([album], 'albums');
      if (albumData.length) {
        return albumData[0];
      }
      throw new Error('Album not found');
    },
    artists: ({ artists }) => getAnyByID(artists, 'artists'),
  },
  Mutation: {
    createTrack: async (_, { args }, { token }) => client.post('', args, {
      headers: {
        Authorization: token,
      },
    }),
    updateTrack: async (_, { id, args }, { token }) => client.put(id, args, {
      headers: {
        Authorization: token,
      },
    }),
    deleteTrack: async (_, { id }, { token }) => client.delete(id, {
      headers: {
        Authorization: token,
      },
    }),
  },
};

export default resolver;
