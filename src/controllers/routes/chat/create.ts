import { Request, RequestHandler, Response } from "express";
import { makeCreateChatUseCase } from "@/use-cases/factories/make-create-chat-use-case";
import { z } from "zod";

const createChatBodySchema = z.object({
    prompt: z.string()
});

export const create: RequestHandler = async (req: Request, res: Response) => {
    const body = createChatBodySchema.safeParse(req.body);

    if (!body.success) {
        console.log(body.error);
        res.status(422).send({ error: "Failed on parsing body." });
        return;
    }

    const { prompt } = body.data;

    const useCase = makeCreateChatUseCase();
    const response = await useCase.execute({ prompt });

    if (response.isFailure()) {
        res.status(500).send("Internal server error");
        return;
    }

    res.status(200).send(response.value);
};