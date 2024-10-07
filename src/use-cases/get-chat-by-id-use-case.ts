import { ChatObject } from "@/entities/Chat";
import { ChatRepository } from "../repositories/chat-repository";
import { Either, failure, success } from "../utils/either";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetChatByIdUseCaseRequest {
    id: string
}

type GetChatByIdUseCaseRespose = Either<
    ResourceNotFoundError,
    ChatObject
>



export class GetChatByIdUseCase {
    constructor(
        private chatRepository: ChatRepository,
    ) {}

    async execute({
        id
    }: GetChatByIdUseCaseRequest): Promise<GetChatByIdUseCaseRespose> {
        const chat = await this.chatRepository.findById(id);

        if (!chat) {
            return failure(new ResourceNotFoundError());
        }

        return success(chat.toObject());
    }
}