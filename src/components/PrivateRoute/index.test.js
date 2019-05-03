import React from 'react';
import { render, mount } from 'enzyme';
import PrivateRoute from './index';
import { AuthContext } from '../AuthContext';
import { Route, Redirect } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';

describe('PrivateRoute component', () => {
  it('display private route if user is authenticated', () => {
    const wrapper = mount(
      <AuthContext.Provider
        value={{
          isAuthenticated: true
        }}
      >
        <MemoryRouter>
          <PrivateRoute exact path="/" component={() => 'Private Data'} />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(wrapper.text()).toContain('Private Data');
  });

  it('take to login page if user is not authenticated', () => {
    const wrapper = mount(
      <AuthContext.Provider
        value={{
          isAuthenticated: false
        }}
      >
        <MemoryRouter>
          <PrivateRoute exact path="/" component={() => 'Private Data'} />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(wrapper.text()).toBeNull();
  });
});
