import express from "express";
import { createServer } from "http";
import cors from "cors";
import router from "./routes/index.js";
const app = express();
const PORT = process.env.PORT;

const server = createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_, res) => {
  res.send("gc is working!!");
  return;
});

app.use("/api", router);

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
