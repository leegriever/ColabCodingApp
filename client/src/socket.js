import { io } from 'socket.io-client';
import { baseUrl } from './constants.js';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : baseUrl.client;

export const socket = io(URL, {
    autoConnect: false
  });