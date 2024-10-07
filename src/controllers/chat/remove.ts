import { Request, RequestHandler, Response } from "express";
import { makeRemoveChatByIdUseCase } from "../../use-cases/factories/make-remove-chat-by-id-use-case";
import { z } from "zod";

export const removeParamSchema = z.object({
    id: z.string().uuid()
});

export const remove: RequestHandler = async (req: Request, res: Response) => {

    const params = removeParamSchema.safeParse(req.params);

    if (!params.success) {
        console.log(params.error);
        res.status(422).send({ error: "Failed on parsing param." });
        return;
    }

    const { id } = params.data;

    const useCase = makeRemoveChatByIdUseCase();
    const response  = await useCase.execute({ id });

    if (response.isFailure()) {
        res.status(response.value.statusCode).send(response.value.message);
        return;
    }

    res.status(204).send(response.value);
};