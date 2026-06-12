import { createContext, useReducer, useEffect, useMemo } from 'react';
import { readJSON, writeJSON, remove } from '../lib/storage.js';
import { mockLogin } from '../mocks/auth.js';

const STORAGE_KEY = 'preproute.auth.v1';

export const initialAuthState = { user: null, token: null, isAuthenticated: false };

export function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload.user, token: action.payload.token, isAuthenticated: true };
    case 'LOGOUT':
      return initialAuthState;
    default:
      return state;
  }
}

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState, (s) => {
    const stored = readJSON(STORAGE_KEY);
    return stored?.token ? { ...stored, isAuthenticated: true } : s;
  });

  useEffect(() => {
    if (state.isAuthenticated) writeJSON(STORAGE_KEY, state);
    else remove(STORAGE_KEY);
  }, [state]);

  const value = useMemo(() => ({
    ...state,
    async login(credentials) {
      const { user, token } = await mockLogin(credentials);
      dispatch({ type: 'LOGIN', payload: { user, token } });
      return user;
    },
    logout() { dispatch({ type: 'LOGOUT' }); },
  }), [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
