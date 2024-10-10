import { Request, RequestHandler, Response } from "express";

export const login: RequestHandler = async (req: Request, res: Response) => {
    res.status(200).send({ message: "login" });
};