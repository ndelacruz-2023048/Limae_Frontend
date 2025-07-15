import { io } from "socket.io-client";
const API_URL = import.meta.env.VITE_API_URL

const URL = `${API_URL}`;

export const socketConnection = io(URL,{autoConnect:false})