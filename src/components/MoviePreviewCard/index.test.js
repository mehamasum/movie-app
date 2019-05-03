import React from 'react';
import { render } from 'enzyme';
import MoviePreviewCard from './index';

describe('MoviePreviewCard component', () => {
  it('rendered the movie title with year', () => {
    const wrapper = render(
      <MoviePreviewCard
        movie={{
          Title: 'Avengers: Endgame',
          Year: 2019,
          Poster: 'https://picsum.photos/200'
        }}
      />
    );
    expect(wrapper.text()).toContain(`Avengers: Endgame (2019)`);
  });
});
