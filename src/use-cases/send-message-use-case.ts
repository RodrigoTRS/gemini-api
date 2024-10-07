import { ChatObject, Message } from "@/entities/Chat";
import { model } from "../lib/gen-model";
import { ChatRepository } from "../repositories/chat-repository";
import { Either, failure, success } from "../utils/either";
import { FailedOnGeneratingResponseError } from "./errors/failed-on-generating-response";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { parseModelReponse } from "@/utils/parse-model-response";
import { enrichPrompt } from "@/utils/enrich-prompt";

interface SendMessageUseCaseRequest {
    id: string
    prompt: string
}

type SendMessageUseCaseResponse = Either<
    ResourceNotFoundError | FailedOnGeneratingResponseError,
    ChatObject
>

export class SendMessageUseCase {

    constructor(
        private chatRepository: ChatRepository,
    ) {}

    async execute({
        id, prompt
    }: SendMessageUseCaseRequest): Promise<SendMessageUseCaseResponse> {

        const chat = await this.chatRepository.findById(id);
        
        if (!chat) {
            return failure(new ResourceNotFoundError());
        }

        chat.appendMessage({
            sender: "user",
            content: [{
                type: "paragraph",
                weight: "normal",
                text: prompt
            }]
        });

        const history = chat.messages.map((message) => {
            return {
                role: message.sender,
                parts: [{ text: JSON.stringify(message.content) }]
            };
        });

        const modelChat = model.startChat({ history });

        const result = await modelChat.sendMessage(enrichPrompt(prompt));

        const modelMessage: Message ={
            sender: "model",
            content: parseModelReponse(result.response.text())
        };

        chat.appendMessage(modelMessage);

        await this.chatRepository.save(chat);

        return success(chat.toObject());

    }
}