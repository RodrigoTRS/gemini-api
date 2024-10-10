import express, { json } from "express";
import cors from "cors";

import { handleUnexistentRoutes } from "./controllers/middlewares/handle-unexistent-routes";

import { healthRoutes } from "./controllers/routes/health/routes";
import { chatRoutes } from "./controllers/routes/chat/routes";
import { authRouter } from "./controllers/routes/auth/routes";

export const app = express();

app.use(json());
app.use(cors({
    credentials: true
}));

app.use("/", healthRoutes);
app.use("/chat", chatRoutes);
app.use("/auth", authRouter);

app.use(handleUnexistentRoutes);