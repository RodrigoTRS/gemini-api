import { MongoChatRepository } from "@/repositories/mongo/mongo-chat-repository";
import { GetChatByIdUseCase } from "../get-chat-by-id-use-case";

export function makeGetChatByIdUseCase() {
    const chatRepository = new MongoChatRepository();
    const useCase = new GetChatByIdUseCase(chatRepository);
    return useCase;
}