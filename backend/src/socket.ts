import { Server, Socket } from "socket.io";
import { NotFoundError } from "./errors/not-found-error.js";
import { produceMessage } from "./streaming.js";

interface CustomSocket extends Socket {
  room?: string;
}

export const socketInit = (io: Server) => {
  io.use((socket: CustomSocket, next) => {
    const room = socket.handshake.auth.room || socket.handshake.headers.room;
    console.log(`ROOM`, room);
    if (!room) {
      //   return next(new NotFoundError("room not found"));
      console.log(`NO ROOM`);
      return;
    }
    socket.room = room;
    next();
  });

  io.on("connection", (socket: CustomSocket) => {
    socket.emit("message", socket.id);
    socket.join(socket.room);

    socket.on("message", async (data) => {
      try {
        await produceMessage("chats", data);
      } catch (error) {
        console.log(`message error`, error);
      }
    });

    socket.on("disconnect", () => {
      console.log(`user disconnected`, socket.id);
    });
  });
};
