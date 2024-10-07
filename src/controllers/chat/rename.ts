import { Request, RequestHandler, Response } from "express";
import { z } from "zod";
import { makeRenameChatByIdUseCase } from "../../use-cases/factories/make-rename-chat-by-id-use-case";

export const renameParamSchema = z.object({
    id: z.string().uuid()
});

const renameBodySchema = z.object({
    name: z.string()
});

export const rename: RequestHandler = async (req: Request, res: Response) => {

    const params = renameParamSchema.safeParse(req.params);

    if (!params.success) {
        console.log(params.error);
        res.status(422).send({ error: "Failed on parsing param." });
        return;
    }

    const body = renameBodySchema.safeParse(req.body);

    if (!body.success) {
        console.log(body.error);
        res.status(422).send({ error: "Failed on parsing body." });
        return;
    }

    const { id } = params.data;
    const { name } = body.data;

    const useCase = makeRenameChatByIdUseCase();
    const response  = await useCase.execute({ id, name });

    if (response.isFailure()) {
        res.status(response.value.statusCode).send(response.value.message);
        return;
    }

    res.status(200).send(response.value);
};