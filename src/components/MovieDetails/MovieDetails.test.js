import React from 'react';
import { render } from 'enzyme';
import MovieDetails from './MovieDetails';

describe('MovieDetails component', () => {
  it('rendered the movie details', () => {
    const wrapper = render(
      <MovieDetails
        movie={{
          Year: 2019
        }}
      />
    );
    expect(wrapper.text()).toContain(`Year: 2019`);
  });
});
