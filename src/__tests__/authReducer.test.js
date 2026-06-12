import { describe, it, expect } from 'vitest'
import { authReducer, initialAuthState } from '../context/AuthContext.jsx'

describe('authReducer', () => {
  it('starts unauthenticated', () => {
    expect(initialAuthState.isAuthenticated).toBe(false);
  });

  it('LOGIN sets user, token, isAuthenticated', () => {
    const next = authReducer(initialAuthState, {
      type: 'LOGIN', payload: { user: { name: 'A' }, token: 't' },
    });
    expect(next).toEqual({ user: { name: 'A' }, token: 't', isAuthenticated: true });
  });

  it('LOGOUT resets', () => {
    const after = authReducer(
      { user: { name: 'A' }, token: 't', isAuthenticated: true },
      { type: 'LOGOUT' },
    );
    expect(after).toEqual(initialAuthState);
  });
});
