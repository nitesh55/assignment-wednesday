import {
  ituneContainerReducer,
  initialState,
  ituneContainerTypes
} from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('ituneContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(ituneContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type FETCH_USER is dispatched', () => {
    const artistName = 'Mohammed Ali Chherawalla';
    const expectedResult = state.set('artistName', artistName);
    expect(
        ituneContainerReducer(state, {
        type: ituneContainerTypes.REQUEST_GET_ITUNE_ARTIST,
        artistName
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the user data is present and userLoading = false when FETCH_USER_SUCCESS is dispatched', () => {
    const data = { name: 'Mohammed Ali Chherawalla' };
    const expectedResult = state.set('artistData', data);
    expect(
        ituneContainerReducer(state, {
        type: ituneContainerTypes.SUCCESS_GET_ITUNE_ARTIST,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the userErrorMessage has some data and userLoading = false when FETCH_USER_FAILURE is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = state.set('artistError', error);
    expect(
        ituneContainerReducer(state, {
        type: ituneContainerTypes.FAILURE_GET_ITUNE_ARTIST,
        error
      })
    ).toEqual(expectedResult);
  });
});
