import AuthUtil from '../utils/auth';

export const getUser = () => {
  return fetch(`/api/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: AuthUtil.getAuthHeader(),
    },
  });
};

export const createUser = (data) => {
  return fetch('/api/user/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: AuthUtil.getAuthHeader(),
    },
    body: JSON.stringify(data),
  });
};

export const updateUser = (data) => {
  return fetch(`/api/user/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: AuthUtil.getAuthHeader(),
    },
    body: JSON.stringify(data),
  });
};

export const loginUser = (data) => {
  return fetch('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const getLogKeys = () => {
  return fetch(`/api/logs/keys`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: AuthUtil.getAuthHeader(),
    },
  });
};

export const addLogs = (data) => {
  return fetch(`/api/logs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: AuthUtil.getAuthHeader(),
    },
    body: JSON.stringify(data),
  });
};

export const getLogs = () => {
  return fetch(`/api/logs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: AuthUtil.getAuthHeader(),
    },
  });
};
