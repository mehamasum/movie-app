import React from 'react';
import MovieDetails from './index';
import { shallow } from 'enzyme';

describe('MovieDetails container', () => {
  it('should render', () => {
    let wrapper = shallow(
      <MovieDetails
        movie={{
          Poster: '',
          Title: 'Good movie',
          Year: 2019
        }}
      />
    );

    expect(wrapper.exists()).toBeTruthy();
  });
});
