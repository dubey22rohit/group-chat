import express from "express";
import { createServer } from "http";
import cors from "cors";
import {
  loginRouter,
  refreshTokenRouter,
  registerRouter,
  logoutRouter,
} from "./routes/v1/index.js";
import { errorHandler } from "./middlewares/error-handler.js";
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT;

const server = createServer(app);

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

// catches any errors thrown by the controller
app.use(errorHandler);

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
