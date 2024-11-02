import express from "express";
import { createServer } from "http";
import cors from "cors";
import {
  loginRouter,
  refreshTokenRouter,
  registerRouter,
  logoutRouter,
  chatGroupRouter,
  groupUsersRouter,
  chatsRouter,
} from "./routes/v1/index.js";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import { errorHandler } from "./middlewares/error-handler.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { socketInit } from "./socket.js";
import redis from "./config/redis-config.js";
import { connectKafkaProducer } from "./config/kafka-config.js";
import { consumeMessages } from "./streaming.js";

const app = express();
const PORT = process.env.PORT;

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_APP_URL, "https://admin.socket.io"],
    methods: ["GET", "POST"],
  },
  adapter: createAdapter(redis),
});

socketInit(io);

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["*"], credentials: true }));

app.get("/", (_, res) => {
  res.send("gc is working!!");
  return;
});

// auth routes
app.use("/api", registerRouter);
app.use("/api", loginRouter);
app.use("/api", logoutRouter);

// token routes
app.use("/api", refreshTokenRouter);

// chat routes
app.use("/api", chatGroupRouter);

// group users routes
app.use("/api", groupUsersRouter);

// chats routes
app.use("/api", chatsRouter);

// catches any errors thrown by the controller
app.use(errorHandler);

connectKafkaProducer().catch((err) => console.log("kafka producer error", err));

consumeMessages(process.env.KAFKA_TOPIC!).catch((err) => console.log("kafka consumer error", err));

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
