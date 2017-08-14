import decode from 'jwt-decode';
import { browserHistory } from 'react-router';
import auth0 from 'auth0-js';
const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access-token';
const DOMAIN = "https://front-react-auth.herokuapp.com"|| 'http://localhost:3000';

const CLIENT_ID = 'fyKU5d2V2nJ0eijY3H7Toz5JviJTnl0c';
const CLIENT_DOMAIN = 'jeffkiller.auth0.com';
const REDIRECT = `${DOMAIN}/callback`;
const SCOPE = 'YOUR_SCOPE';
const AUDIENCE = 'test';

var auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN
});

export function login() {
  auth.authorize({
    responseType: 'token id_token',
    redirectUri: REDIRECT,
    audience: AUDIENCE,
    scope: SCOPE
  });
}

export function logout() {
  clearIdToken();
  clearAccessToken();
  browserHistory.push('/');
}

export function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({pathname: '/'});
  }
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

function getParameterByName(name) {
  let match = RegExp(`[#&]${name}=([^&]*)`).exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

export function setAccessToken() {
  let accessToken = getParameterByName('access_token');
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function setIdToken() {
  let idToken = getParameterByName('id_token');
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
  if (!encodedToken || encodedToken === 'null') return 0;
  const token = decode(encodedToken);
  if (!token.exp) { return 0; };

  const date = new Date(0);
  date.setUTCSeconds(token.exp);
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}
