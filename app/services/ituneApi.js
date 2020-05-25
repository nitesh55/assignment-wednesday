import { generateApiClientItune } from '@utils/apiUtils';
const repoApi = generateApiClientItune('itune');

export const getArtist = artistName =>
  repoApi.get(`/search?term=${artistName}`);
