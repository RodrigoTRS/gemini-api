import { Request, RequestHandler, Response } from "express";
import { makeListChatsUseCase } from "@/use-cases/factories/make-list-chats.use-case";

export const list: RequestHandler = async (req: Request, res: Response) => {

    const useCase = makeListChatsUseCase();
    const response  = await useCase.execute();

    res.status(200).send(response.value);
};