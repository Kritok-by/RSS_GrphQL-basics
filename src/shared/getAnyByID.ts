import axios from 'axios';
import { env } from 'process';
import { processData, wrongOutputKeys } from './dataProcess';

const urls = {
  artists: env.ARTISTS_URL,
  user: env.USER_URL,
  genres: env.GENRES_URL,
  bands: env.BANDS_URL,
  albums: env.ALBUMS_URL,
  tracks: env.TRACKS_URL,
  favorites: env.FAVORITES_URL,
};

const getAnyByID = async (ids: string[], type: keyof typeof urls) => {
  const client = (() => axios.create({ baseURL: urls[type] }))();

  const res = await Promise.allSettled(
    ids?.map((id) => client.get(id)),
  );

  return res.filter((i) => i.status === 'fulfilled').map((i:PromiseFulfilledResult<any>) => processData(i.value.data, wrongOutputKeys));
};

export default getAnyByID;
