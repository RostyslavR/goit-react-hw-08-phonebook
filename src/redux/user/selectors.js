export const selectUser = state => state.user.data;

export const selectUserStatus = state => state.user.status;

export const selectUserIsLoading = state => state.user.isLoading;

export const selectIsSingedIn = state => Boolean(state.user.data);

export const selectToRemember = state => state.user.rememberMe;
