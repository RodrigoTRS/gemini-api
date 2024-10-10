import express from "express";
import { Request, Response } from "express";

export const healthRoutes = express.Router();

healthRoutes.get("/", (req: Request, res: Response) => {
    res.status(200).send({ health: "check" });
});
