export const saveToken = (token) => {
  localStorage.setItem('accessToken', token);
};

export const getToken = () => {
  return localStorage.getItem('accessToken');
};

export const clearToken = () => {
  localStorage.removeItem('accessToken');
};

export const saveUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const setUserToContext = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
