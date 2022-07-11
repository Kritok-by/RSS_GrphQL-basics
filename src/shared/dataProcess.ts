export const wrongOutputKeys = {
  _id: 'id',
  bandsIds: 'bands',
  userId: 'id',
  genresIds: 'genres',
  artistsIds: 'artists',
  trackIds: 'tracks',
  albumId: 'album',
};

export const wrongInputKeys = Object.fromEntries(
  Object.entries(wrongOutputKeys)
    .map(([key, value]) => [value, key]),
);

export const processData = (
  data: any,
  object: (typeof wrongInputKeys) | (typeof wrongOutputKeys),
) => Object.fromEntries(
  Object.entries(data)
    .map(([key, value]) => [key in object ? object[key] : key, value]),
);
