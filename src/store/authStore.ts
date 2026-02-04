// auth/authStore.ts (NOT a hook)
let accessToken: string | null = null;

export const authStore = {
  getToken() {
    return accessToken;
  },

  setToken(token: string) {
    accessToken = token;
  },

  clear() {
    accessToken = null;
  },
};
