import { Request, RequestHandler, Response } from "express";
import { z } from "zod";
import { makeGetChatByIdUseCase } from "../../use-cases/factories/make-get-chat-by-id-use-case";

export const getByIdParamSchema = z.object({
    id: z.string().uuid()
});

export const getById: RequestHandler = async (req: Request, res: Response) => {

    const params = getByIdParamSchema.safeParse(req.params);

    if (!params.success) {
        console.log(params.error);
        res.status(422).send({ error: "Failed on parsing param." });
        return;
    }

    const { id } = params.data;

    const useCase = makeGetChatByIdUseCase();
    const response  = await useCase.execute({ id });

    if (response.isFailure()) {
        res.status(response.value.statusCode).send(response.value.message);
        return;
    }

    res.status(200).send(response.value);
};