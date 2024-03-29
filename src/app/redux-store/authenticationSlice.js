import {
  getPayloadToken,
  isTokenValid,
  setToken,
} from "./..//services/tokenServices";

import { createSlice } from "@reduxjs/toolkit";

/**
 * initial state: {
 *  - isAuthenticated:  check if the user is already authenticated when openning the Application
 *  - token: the token of the user
 *  - user: the user data
 * }
 * @author Peter Mollet
 */
const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

export const authenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      const token = action.payload;
      state.token = token;
      const claims = getPayloadToken(token);
      // console.log('claims', claims)
      const user = claims.sub;
      state.user = user;
      state.isAuthenticated = isTokenValid(token);
      setToken(token);
    },
    signOut: (state) => {
      localStorage.clear();
      sessionStorage.clear();
      (state.token = null),
        (state.user = null),
        (state.isAuthenticated = false);
    },
  },
});

export const { signIn, signOut } = authenticationSlice.actions;

export const selectIsLogged = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectHasRole = (state, roles) => {
  if (!roles || roles.length === 0) return true;
  const user = state.auth.user;
  if (!user) return false;
  return user.roles.some((role) => roles.includes(role));
};

export default authenticationSlice.reducer;
