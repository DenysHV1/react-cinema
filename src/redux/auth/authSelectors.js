export const isAuthenticatedSelector = (state) => state.auth.isAuthenticated;
export const sessionIdSelector = (state) => state.auth.sessionId;

export const selectIsLoggedInAuth = (state) => state.auth.isLoggedIn;
