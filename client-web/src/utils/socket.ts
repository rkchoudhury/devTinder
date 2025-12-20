import { io } from "socket.io-client";
import { BASE_URL_DEV } from "./apiConfig";

/**
 * The socket is running at localhost:7000/socket.io in development 
 *    The /socket.io path is default for Socket.IO
 */
const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BASE_URL_DEV);
  } else {
    return io("/", { path: "/api/socket.io" });
  }
}

export { createSocketConnection };