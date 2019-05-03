import React from 'react';
import { render, mount, shallow } from 'enzyme';
import Navbar from './index';
import InputBase from '@material-ui/core/InputBase';
import { AuthContext } from '../AuthContext';
import { MemoryRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';

describe('Navbar component', () => {
  it('rendered the title', () => {
    const wrapper = render(
      <AuthContext.Provider value={{ isAuthenticated: true }}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(wrapper.text()).toContain('Movie App');
  });

  it('contains a search box', () => {
    const wrapper = mount(
      <AuthContext.Provider value={{ isAuthenticated: true }}>
        <MemoryRouter>
          <Navbar searchable/>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(wrapper.find(InputBase)).toHaveLength(1);
  });

  it('display profile and logout menu if user is authenticated', () => {
    const wrapper = mount(
      <AuthContext.Provider value={{ isAuthenticated: true }}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    const menuButton = wrapper.find(IconButton);
    menuButton.simulate('click');
    expect(wrapper.find(MenuItem)).toHaveLength(2);
  });
});
