/**
 * Test homeContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getArtist } from '@services/ituneApi';
import { apiResponseGenerator } from '@utils/testUtils';
import ituneContainerSaga, { getItuneArtist } from '../saga';
import { ituneContainerTypes } from '../reducer';

describe('ItuneContainer saga tests', () => {
  const generator = ituneContainerSaga();
  const artistName = 'mac';
  let getItuneArtistGenerator = getItuneArtist({ artistName });

  it('should start task to watch for REQUEST_GET_ITUNE_ARTIST action', () => {
    expect(generator.next().value).toEqual(
      takeLatest(ituneContainerTypes.REQUEST_GET_ITUNE_ARTIST, getItuneArtist)
    );
  });

  it('should ensure that the action FAILURE_GET_ITUNE_ARTIST is dispatched when the api call fails', () => {
    const res = getItuneArtistGenerator.next().value;
    expect(res).toEqual(call(getArtist, artistName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching repo informations.'
    };
    expect(
        getItuneArtistGenerator.next(apiResponseGenerator(false, errorResponse))
        .value
    ).toEqual(
      put({
        type: ituneContainerTypes.FAILURE_GET_ITUNE_ARTIST,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_ITUNE_ARTIST is dispatched when the api call succeeds', () => {
    getItuneArtistGenerator = getItuneArtist({ artistName });
    const res = getItuneArtistGenerator.next().value;
    expect(res).toEqual(call(getArtist, artistName));
    const reposResponse = {
      resultCount: 1,
      results: [{ artistName: artistName }]
    };
    expect(
        getItuneArtistGenerator.next(apiResponseGenerator(true, reposResponse))
        .value
    ).toEqual(
      put({
        type: ituneContainerTypes.SUCCESS_GET_ITUNE_ARTIST,
        data: reposResponse
      })
    );
  });
});
