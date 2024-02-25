import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : "colabcodingapp-production-d42f.up.railway.app";

export const socket = io(URL, {
    autoConnect: false
  });