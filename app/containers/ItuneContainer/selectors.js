import { createSelector } from 'reselect';
import _ from 'lodash';
import { initialState } from './reducer';

/**
 * Direct selector to the homeContainer state domain
 */

const selectContainerDomain = state =>
  (state.ituneContainer || initialState).toJS();

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomeContainer
 */

export const selectItuneContainer = () =>
  createSelector(
    selectContainerDomain,
    substate => substate
  );

export const selectItuneData = () =>
  createSelector(
    selectContainerDomain,
    substate => _.get(substate, 'artistData', null)
  );

export const selectItuneError = () =>
  createSelector(
    selectContainerDomain,
    substate => _.get(substate, 'artistError', null)
  );

export const selectArtistName = () =>
  createSelector(
    selectContainerDomain,
    substate => _.get(substate, 'artistName', null)
  );

export default selectItuneContainer;
