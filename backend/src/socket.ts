import { Server, Socket } from "socket.io";
import { NotFoundError } from "./errors/not-found-error.js";

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
    // next();
  });

  io.on("connection", (socket: CustomSocket) => {
    console.log(`CONENCTION MADE`, socket.room);
    socket.emit("message", socket.id);
    socket.join(socket.room);

    socket.on("message", async (data) => {
      try {
        // Produce message
        console.log(`message received`, data);
        socket.emit("message", `${data} to you too!`);
      } catch (error) {
        console.log(`message error`, error);
      }
      socket.to(socket.room).emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log(`user disconnected`, socket.id);
    });
  });
};
