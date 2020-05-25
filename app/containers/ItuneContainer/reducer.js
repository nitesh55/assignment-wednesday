/*
 *
 * HomeContainer reducer
 *
 */
import produce from 'immer';
import { fromJS } from 'immutable';
import { createActions } from 'reduxsauce';
import _ from 'lodash';

export const {
  Types: ituneContainerTypes,
  Creators: ituneContainerCreators
} = createActions({
  requestGetItuneArtist: ['artistName'],
  successGetItuneArtist: ['data'],
  failureGetItuneArtist: ['error'],
  clearItuneArtist: []
});
export const initialState = fromJS({});

/* eslint-disable default-case, no-param-reassign */
export const ituneContainerReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
      
    switch (action.type) {
      case ituneContainerTypes.REQUEST_GET_ITUNE_ARTIST:
        return initialState.set('artistName', action.artistName);
      case ituneContainerTypes.CLEAR_ITUNE_ARTIST:
        return initialState.set('artistName', null).set('artistData', null);
      case ituneContainerTypes.SUCCESS_GET_ITUNE_ARTIST:
        return state.set('artistData', action.data);
      case ituneContainerTypes.FAILURE_GET_ITUNE_ARTIST:
        return state.set(
          'artistError',
          _.get(action.error, 'message', 'something_went_wrong')
        );
    }
    return state;
  });

export default ituneContainerReducer;
