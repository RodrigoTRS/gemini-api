import { MongoChatRepository } from "@/repositories/mongo/mongo-chat-repository";
import { RemoveChatByIdUseCase } from "../remove-chat-by-id-use-case";

export function makeRemoveChatByIdUseCase() {
    const chatRepository = new MongoChatRepository();
    const useCase = new RemoveChatByIdUseCase(chatRepository);
    return useCase;
}