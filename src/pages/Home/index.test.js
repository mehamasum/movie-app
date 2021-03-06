import React from 'react';
import { render } from 'react-testing-library';

import Home, { makeURL } from './index';
import { AuthContext } from '../../components/AuthContext';
import { MemoryRouter } from 'react-router-dom';

const searchResults = {
  Search: [
    {
      Title: 'Mission: Impossible - Ghost Protocol',
      Year: '2011',
      imdbID: 'tt1229238',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMTY4MTUxMjQ5OV5BMl5BanBnXkFtZTcwNTUyMzg5Ng@@._V1_SX300.jpg'
    },
    {
      Title: 'Mission: Impossible',
      Year: '1996',
      imdbID: 'tt0117060',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMTc3NjI2MjU0Nl5BMl5BanBnXkFtZTgwNDk3ODYxMTE@._V1_SX300.jpg'
    },
    {
      Title: 'Mission: Impossible - Ghost Protocol',
      Year: '2011',
      imdbID: 'tt1458596',
      Type: 'movie',
      Poster:
        'http://ia.media-imdb.com/images/M/MV5BMTY4MTUxMjQ5OV5BMl5BanBnXkFtZTcwNTUyMzg5Ng@@._V1_SX300.jpg'
    },
    {
      Title: 'Mission: Impossible - Rogue Nation',
      Year: '2015',
      imdbID: 'tt2381249',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BOTFmNDA3ZjMtN2Y0MC00NDYyLWFlY2UtNTQ4OTQxMmY1NmVjXkEyXkFqcGdeQXVyNTg4NDQ4NDY@._V1_SX300.jpg'
    },
    {
      Title: 'Mission: Impossible III',
      Year: '2006',
      imdbID: 'tt0317919',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BOThhNTA1YjItYzk2Ny00M2Y1LWJlYWUtZDQyZDU0YmY5Y2M5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'
    },
    {
      Title: 'Mission: Impossible II',
      Year: '2000',
      imdbID: 'tt0120755',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BN2RkYWVkZDQtNTMxMi00NWQ4LWE2ODctNmQzOWM2NjQzYzdlXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg'
    },
    {
      Title: 'Mission: Impossible - Fallout',
      Year: '2018',
      imdbID: 'tt4912910',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BNjRlZmM0ODktY2RjNS00ZDdjLWJhZGYtNDljNWZkMGM5MTg0XkEyXkFqcGdeQXVyNjAwMjI5MDk@._V1_SX300.jpg'
    },
    {
      Title: 'Mission to Mars',
      Year: '2000',
      imdbID: 'tt0183523',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMzhiNjVhZjUtMWYwMy00M2U5LWE5NWEtNGU4N2E5NTI3MzFlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'
    },
    {
      Title: 'The Mission',
      Year: '1986',
      imdbID: 'tt0091530',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMjQ3MDczZmUtZmFlMy00YzFlLTlmNmMtYTE2NTZiNTJjM2UzL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg'
    },
    {
      Title: 'Police Academy: Mission to Moscow',
      Year: '1994',
      imdbID: 'tt0110857',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BNmM5MzA3YTMtZDZkNy00YzNlLWFkZTUtZDJhYTNkMzk1ODNlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'
    }
  ],
  totalResults: '807',
  Response: 'True'
};

describe('Home page', () => {
  it('make api call', () => {
    jest.spyOn(global, 'fetch').mockImplementation(
      () =>
        new Promise(resolve =>
          resolve({
            ok: true,
            status: 200,
            json: () => {
              return searchResults;
            }
          })
        )
    );

    const { container, debug } = render(
      <AuthContext.Provider
        value={{
          isAuthenticated: true
        }}
      >
        <MemoryRouter>
          <Home
            location={{
              search: null
            }}
          />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(global.fetch).toHaveBeenCalledTimes(0);

    render(
      <AuthContext.Provider
        value={{
          isAuthenticated: true
        }}
      >
        <MemoryRouter>
          <Home
            location={{
              search: '?q=mission&page=1'
            }}
          />
        </MemoryRouter>
      </AuthContext.Provider>,
      { container }
    );

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(makeURL('mission', 1));
  });
});
