import React from 'react';
import { render, mount } from 'enzyme';
import Navbar from './index';
import InputBase from '@material-ui/core/InputBase';

describe('Navbar component', () => {
    it('rendered the title', () => {
        const wrapper = render(<Navbar />);
        expect(wrapper.text()).toContain('Movie App');
    });

    it('contains a search box', () => {
        const wrapper = mount(<Navbar />);
        expect(wrapper.find(InputBase)).toHaveLength(1);
    });
});