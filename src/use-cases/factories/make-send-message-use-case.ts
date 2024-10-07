import { MongoChatRepository } from "@/repositories/mongo/mongo-chat-repository";
import { SendMessageUseCase } from "../send-message-use-case";

export function makeSendMessageUseCase() {
    const chatRepository = new MongoChatRepository();
    const useCase = new SendMessageUseCase(chatRepository);
    return useCase;
}