import { Request, RequestHandler, Response } from "express";

export const register: RequestHandler = async (req: Request, res: Response) => {
    res.status(200).send({ message: "register" });
};