import { ChatObject } from "@/entities/Chat";
import { ChatRepository } from "../repositories/chat-repository";
import { Either, failure, success } from "../utils/either";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface RenameChatByIdUseCaseRequest {
    id: string
    name: string
}

type RenameChatByIdUseCaseRespose = Either<
    ResourceNotFoundError,
    ChatObject
>

export class RenameChatByIdUseCase {
    constructor(
        private chatRepository: ChatRepository
    ) {}

    async execute({
        id,
        name
    }: RenameChatByIdUseCaseRequest): Promise<RenameChatByIdUseCaseRespose> {

        const chat = await this.chatRepository.findById(id);

        if (!chat) {
            return failure(new ResourceNotFoundError());
        }

        chat.name = name;

        await this.chatRepository.save(chat);

        return success(chat.toObject());
    }
}