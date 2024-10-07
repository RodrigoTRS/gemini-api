import { ChatRepository } from "../repositories/chat-repository";
import { Either, success } from "../utils/either";
import { model } from "../lib/gen-model";
import { Chat, ChatObject, Message } from "../entities/Chat";
import { enrichPrompt } from "@/utils/enrich-prompt";
import { parseModelReponse } from "@/utils/parse-model-response";

interface CreateChatUseCaseRequest {
    prompt: string
}

type CreateChatUseCaseResponse = Either<
    null,
    ChatObject
>
export class CreateChatUseCase {
    constructor(
        private chatRepository: ChatRepository,
    ){}

    async execute({
        prompt
    }: CreateChatUseCaseRequest): Promise<CreateChatUseCaseResponse> {

        const chat = Chat.create({
            name: prompt,
            messages: [{
                sender: "user",
                content: [{
                    type: "paragraph",
                    weight: "normal",
                    text: prompt
                }]
            }]
        });

        const history = [{
            role: "user",
            parts: [{ text: prompt }]
        }];

        const modelChat = model.startChat({ history });
        const result = await modelChat.sendMessage(enrichPrompt(prompt));

        const modelMessage: Message ={
            sender: "model",
            content: parseModelReponse(result.response.text())
        };

        chat.appendMessage(modelMessage);

        await this.chatRepository.create(chat);

        return success(chat.toObject());
    }
}