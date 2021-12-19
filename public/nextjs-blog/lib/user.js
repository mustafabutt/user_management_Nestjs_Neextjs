import { constants } from '../constants';

export async function login(user) {
  const res = await fetch(constants.LOGIN, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': constants.CONTENT_TYPE,
    },
  });
  const data = await res.json();
  return data;
}

export async function signup(user) {
  return await fetch(constants.SIGN_UP_URL, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': constants.CONTENT_TYPE,
    },
  });
}

export async function callLogout(token) {
  const res = await fetch(constants.LOGOUT, {
    method: 'PUT',
    body: JSON.stringify({
      token: token,
    }),
    headers: {
      'Content-Type': constants.CONTENT_TYPE,
      Authorization: constants.BEARER+token,
    },
  });
  const data = await res.json();
  return data;
}
