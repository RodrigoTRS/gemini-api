import express, { json } from "express";
import cors from "cors";
import { chatRoutes } from "./controllers/chat/routes";
import { healthRoutes } from "./controllers/health/routes";
import { handleUnexistentRoutes } from "./controllers/middlewares/handle-unexistent-routes";

export const app = express();

app.use(json());
app.use(cors({
    credentials: true
}));

app.use("/", healthRoutes);
app.use("/chat", chatRoutes);

app.use(handleUnexistentRoutes);