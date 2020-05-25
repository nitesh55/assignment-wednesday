import { ituneContainerTypes, ituneContainerCreators } from '../reducer';

describe('ItuneContainer action tests', () => {
  it('has a type of REQUEST_GET_ITUNE_ARTIST', () => {
    const expected = {
      type: ituneContainerTypes.REQUEST_GET_ITUNE_ARTIST,
      artistName: 'artistName'
    };
    expect(ituneContainerCreators.requestGetItuneArtist('artistName')).toEqual(
      expected
    );
  });
});
