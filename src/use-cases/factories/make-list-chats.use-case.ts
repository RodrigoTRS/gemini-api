import { MongoChatRepository } from "@/repositories/mongo/mongo-chat-repository";
import { ListChatsUseCase } from "../list-chats-use-case";

export function makeListChatsUseCase() {
    const chatRepository = new MongoChatRepository();
    const useCase = new ListChatsUseCase(chatRepository);
    return useCase;
}