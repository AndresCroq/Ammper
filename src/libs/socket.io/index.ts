import { Manager, Socket } from "socket.io-client";
import { addFromSocket } from "src/store/apps/shipments";

let socket: Socket

export const connectToServer = (dispatch: any) => {
  const manager = new Manager(`${process.env.NEXT_PUBLIC_BACK}/socket.io/socket.io.js`, {
    extraHeaders: {
      authorization: `Bearer ${localStorage.getItem('AuthorizationToken')}`
    }
  });

  socket?.removeAllListeners();
  socket = manager.socket('/');

  socket.on('exception', (res) => res.map((e: string) => e));
  socket.on('broadcast', () => dispatch(addFromSocket()));
}