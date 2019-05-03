import React from 'react';
import { render } from 'enzyme';
import MoviePreviewCard from './index';

describe('MoviePreviewCard component', () => {
  it('rendered the movie title with year', () => {
    const wrapper = render(
      <MoviePreviewCard
        title="Avengers: Endgame"
        year={2019}
        poster="https://picsum.photos/200"
      />
    );
    expect(wrapper.text()).toContain(`Avengers: Endgame (2019)`);
  });
});
