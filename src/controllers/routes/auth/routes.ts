import express from "express";
import { register } from "./register";
import { login } from "./login";

export const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);