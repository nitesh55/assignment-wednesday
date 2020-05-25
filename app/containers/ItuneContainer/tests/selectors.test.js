import { fromJS } from 'immutable';
import {
  selectItuneContainer,
  selectArtistName,
  selectItuneData,
  selectItuneError
} from '../selectors';

describe('ItuneContainer selector tests', () => {
  let mockedState;
  let artistName;
  let artistData;
  let artistError;

  beforeEach(() => {
    artistName = 'mac';
    artistData = { resultCount: 1, results: [{ artistName }] };
    artistError = 'There was some error while fetching the repository details';

    mockedState = {
      ituneContainer: fromJS({
        artistName,
        artistData,
        artistError
      })
    };
  });
  it('should select the ituneContainer state', () => {
    const ituneContainerSelector = selectItuneContainer();
    expect(ituneContainerSelector(mockedState)).toEqual(
      mockedState.ituneContainer.toJS()
    );
  });
  it('should select the artistName', () => {
    const artistSelector = selectArtistName();
    expect(artistSelector(mockedState)).toEqual(artistName);
  });

  it('should select artistData', () => {
    const artistDataSelector = selectItuneData();
    expect(artistDataSelector(mockedState)).toEqual(artistData);
  });

  it('should select the artistError', () => {
    const artistErrorSelector = selectItuneError();
    expect(artistErrorSelector(mockedState)).toEqual(artistError);
  });
});
