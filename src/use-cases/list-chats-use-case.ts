import { ChatObject } from "@/entities/Chat";
import { ChatRepository } from "../repositories/chat-repository";
import { Either, success } from "../utils/either";

type ListChatsUseCaseResponse = Either<
    null,
    ChatObject[]
>

export class ListChatsUseCase {
    constructor(
        private chatRepository: ChatRepository,
    ){}

    async execute(): Promise<ListChatsUseCaseResponse> {
        const chats = await this.chatRepository.findAll();        
        const chatObjects = chats.map(chat => chat.toObject());

        return success(chatObjects);
    }
}