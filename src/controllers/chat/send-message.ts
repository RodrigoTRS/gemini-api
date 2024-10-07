import { Request, RequestHandler, Response } from "express";
import { z } from "zod";
import { makeSendMessageUseCase } from "../../use-cases/factories/make-send-message-use-case";

export const sendMessageParamSchema = z.object({
    id: z.string().uuid()
});

const sendMessageBodySchema = z.object({
    prompt: z.string()
});

export const sendMessage: RequestHandler = async (req: Request, res: Response) => {

    const params = sendMessageParamSchema.safeParse(req.params);

    if (!params.success) {
        console.log(params.error);
        res.status(422).send({ error: "Failed on parsing param." });
        return;
    }

    const body = sendMessageBodySchema.safeParse(req.body);

    if (!body.success) {
        console.log(body.error);
        res.status(422).send({ error: "Failed on parsing body." });
        return;
    }

    const { id } = params.data;
    const { prompt } = body.data;

    const useCase = makeSendMessageUseCase();
    const response  = await useCase.execute({ id, prompt });

    if (response.isFailure()) {
        res.status(response.value.statusCode).send(response.value.message);
        return;
    }

    res.status(200).send(response.value);
};