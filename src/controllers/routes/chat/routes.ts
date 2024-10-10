import express from "express";

import { create } from "./create";
import { list } from "./list";
import { getById } from "./get-by-id";
import { remove } from "./remove";
import { sendMessage } from "./send-message";
import { rename } from "./rename";

export const chatRoutes = express.Router();

chatRoutes.get("/", list);
chatRoutes.post("/", create);
chatRoutes.get("/:id", getById);
chatRoutes.post("/:id", sendMessage);
chatRoutes.delete("/:id", remove);
chatRoutes.patch("/:id", rename);
