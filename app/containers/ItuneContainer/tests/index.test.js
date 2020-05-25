/**
 *
 * Tests for ItuneContainer
 *
 */

import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { ItuneContainerTest as ItuneContainer } from '../index';

describe('<ItuneContainer /> tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(
      <ItuneContainer dispatchItuneArtist={submitSpy} />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearItuneArtist on empty change', async () => {
    const getItuneArtistSpy = jest.fn();
    const clearItuneArtistSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <ItuneContainer
        dispatchClearItuneArtist={clearItuneArtistSpy}
        dispatchItuneArtist={getItuneArtistSpy}
      />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getItuneArtistSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearItuneArtistSpy).toBeCalled();
  });

  it('should call dispatchItuneArtist on change', async () => {
    const { getByTestId } = renderProvider(
      <ItuneContainer dispatchItuneArtist={submitSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'some repo' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
});
