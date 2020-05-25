import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { Card, Skeleton, Input } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import T from '@components/T';
import Clickable from '@components/Clickable';
import { useInjectSaga } from 'utils/injectSaga';
import {
  selectItuneContainer,
  selectItuneData,
  selectItuneError,
  selectArtistName
} from './selectors';
import { ituneContainerCreators } from './reducer';
import saga from './saga';

const { Search } = Input;

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${props => props.maxwidth};
    color: ${props => props.color};
    ${props => props.color && `color: ${props.color}`};
  }
`;
const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${props => props.maxwidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${props => props.padding}px;
  }
`;
const RightContent = styled.div`
  display: flex;
  align-self: flex-end;
`;
export function ItuneContainer({
  dispatchItuneArtist,
  dispatchClearItuneArtist,
  intl,
  artistData = {},
  artistsError = null,
  repoName,
  maxwidth,
  padding
}) {
  useInjectSaga({ key: 'ituneContainer', saga });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Effects will be called instead of componentDidMount, componentDidUpdate, componentWillRecieveProps
    // This effect will be called for every render.
    const loaded = get(artistData, 'results', null) || artistsError;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [artistData]);

  const history = useHistory();

  const handleOnChange = rName => {
    if (!isEmpty(rName)) {
      dispatchItuneArtist(rName);
      setLoading(true);
    } else {
        dispatchClearItuneArtist();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderRepoList = () => {
    const items = get(artistData, 'results', []);
    const totalCount = get(artistData, 'resultCount', 0);
    return (
      (items.length !== 0 || loading) && (
        <CustomCard>
          <Skeleton loading={loading} active>
            {repoName && (
              <div>
                <T id="search_query" values={{ repoName }} />
              </div>
            )}
            {totalCount !== 0 && (
              <div>
                <T id="matching_repos" values={{ totalCount }} />
              </div>
            )}
            {items.map((item, index) => (
              <CustomCard key={index}>
                <img src={item.artworkUrl100} />
                <div>Artist Name: {item.artistName}</div>
                <div>Track Name: {item.trackName}</div>
                <div>Collection Stars: {item.collectionName}</div>
              </CustomCard>
            ))}
          </Skeleton>
        </CustomCard>
      )
    );
  };
  const renderErrorState = () => {
    let repoError;
    if (artistsError) {
      repoError = artistsError;
    } else if (!get(artistData, 'totalCount', 0)) {
      repoError = 'artist_search_default';
    }
    return (
      !loading &&
      repoError && (
        <CustomCard
          color={artistsError ? 'red' : 'grey'}
          title={intl.formatMessage({ id: 'artist_list' })}
        >
          <T id={repoError} />
        </CustomCard>
      )
    );
  };
  const refreshPage = () => {
    history.push('stories');
    window.location.reload();
  };
  return (
    <Container maxwidth={maxwidth} padding={padding}>
      {/* <RightContent>
        <Clickable textId="stories" onClick={refreshPage} />
      </RightContent> */}
      <CustomCard
        title={intl.formatMessage({ id: 'artist_search' })}
        maxwidth={maxwidth}
      >
        <T marginBottom={10} id="get_artist_details" />
        <Search
          data-testid="search-bar"
          defaultValue={repoName}
          type="text"
          onChange={evt => debouncedHandleOnChange(evt.target.value)}
          onSearch={searchText => debouncedHandleOnChange(searchText)}
        />
      </CustomCard>
      {renderRepoList()}
      {renderErrorState()}
    </Container>
  );
}

ItuneContainer.propTypes = {
  dispatchItuneArtist: PropTypes.func,
  dispatchClearItuneArtist: PropTypes.func,
  intl: PropTypes.object,
  artistData: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  }),
  artistsError: PropTypes.object,
  repoName: PropTypes.string,
  history: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

ItuneContainer.defaultProps = {
  maxwidth: 500,
  padding: 20
};

const mapStateToProps = createStructuredSelector({
  ituneContainer: selectItuneContainer(),
  artistData: selectItuneData(),
  artistsError: selectItuneError(),
  repoName: selectArtistName()
});

function mapDispatchToProps(dispatch) {
  const { requestGetItuneArtist, clearItuneArtist } = ituneContainerCreators;
  return {
    dispatchItuneArtist: repoName => dispatch(requestGetItuneArtist(repoName)),
    dispatchClearItuneArtist: () => dispatch(clearItuneArtist())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  injectIntl,
  withConnect,
  memo
)(ItuneContainer);

export const ItuneContainerTest = compose(injectIntl)(ItuneContainer);
