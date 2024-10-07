import { MongoChatRepository } from "@/repositories/mongo/mongo-chat-repository";
import { CreateChatUseCase } from "../create-chat-use-case";

export function makeCreateChatUseCase() {
    const chatRepository = new MongoChatRepository();
    const useCase = new CreateChatUseCase(chatRepository );
    return useCase;
}