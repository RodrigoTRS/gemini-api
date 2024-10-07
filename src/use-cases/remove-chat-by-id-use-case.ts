import { ChatObject } from "@/entities/Chat";
import { ChatRepository } from "../repositories/chat-repository";
import { Either, failure, success } from "../utils/either";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface RemoveChatByIdUseCaseRequest {
    id: string
}

type RemoveChatByIdUseCaseRespose = Either<
    ResourceNotFoundError,
    ChatObject
>



export class RemoveChatByIdUseCase {
    constructor(
        private chatRepository: ChatRepository
    ) {}

    async execute({
        id
    }: RemoveChatByIdUseCaseRequest): Promise<RemoveChatByIdUseCaseRespose> {
        const chat = await this.chatRepository.remove(id);

        if(!chat) {
            return failure(new ResourceNotFoundError());
        }

        return success(chat.toObject());
    }
}