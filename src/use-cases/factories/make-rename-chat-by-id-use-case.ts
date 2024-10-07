import { MongoChatRepository } from "@/repositories/mongo/mongo-chat-repository";
import { RenameChatByIdUseCase } from "../rename-chat-by-id-use-case";

export function makeRenameChatByIdUseCase() {
    const chatRepository = new MongoChatRepository();
    const useCase = new RenameChatByIdUseCase(chatRepository);
    return useCase;
}