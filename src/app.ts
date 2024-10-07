import express, { json } from "express";
import cors from "cors";
import { chatRoutes } from "./controllers/chat/routes";

export const app = express();

app.use(json());
app.use(cors({
    credentials: true
}));

app.use("/chat", chatRoutes);
