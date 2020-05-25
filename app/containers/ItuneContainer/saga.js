import { put, call, takeLatest } from 'redux-saga/effects';
import { getArtist } from '@services/ituneApi';
import { ituneContainerTypes, ituneContainerCreators } from './reducer';

const { REQUEST_GET_ITUNE_ARTIST } = ituneContainerTypes;
const { successGetItuneArtist, failureGetItuneArtist } = ituneContainerCreators;
export function* getItuneArtist(action) {
  const response = yield call(getArtist, action.artistName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetItuneArtist(data));
  } else {
    yield put(failureGetItuneArtist(data));
  }
}
// Individual exports for testing
export default function* ituneContainerSaga() {
  yield takeLatest(REQUEST_GET_ITUNE_ARTIST, getItuneArtist);
}
