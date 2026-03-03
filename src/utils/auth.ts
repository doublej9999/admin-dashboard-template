const TOKEN_KEY = 'admin-dashboard-token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const isAuthed = () => Boolean(getToken());

export const login = (username: string, password: string) => {
  const isValid = username === 'admin' && password === 'admin123';
  if (isValid) {
    localStorage.setItem(TOKEN_KEY, 'mock-token');
  }
  return isValid;
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
