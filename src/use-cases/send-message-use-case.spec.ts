import { InMemoryChatRepository } from "@/repositories/in-memory/in-memory-chat-repository";
import { SendMessageUseCase } from "./send-message-use-case";
import { makeChat } from "@/entities/factories/make-chat";

let chatRepository: InMemoryChatRepository; 
let sut: SendMessageUseCase;


describe("Send message use case", () => {

    beforeEach(() => {
        chatRepository = new InMemoryChatRepository();
        sut = new SendMessageUseCase(chatRepository);
    });

    it("should be able to send a new message and receive an answer", async () => {
        const chat = makeChat({
            messages: [
                {
                    sender: "user",
                    content: [{
                        type: "paragraph",
                        weight: "normal",
                        text: "Send me only health check"
                    }]
                },
                {
                    sender: "model",
                    content: [{
                        type: "paragraph",
                        weight: "normal",
                        text: "health check"
                    }]
                },
            ]
        });

        chatRepository.items.push(chat);

        const response = await sut.execute({
            id: chat.id.toString(),
            prompt: ("Send me only health check")
        });

        expect(response.isSuccess()).toBeTruthy();
        expect(chatRepository.items[0].messages[3].content[0].text).toBe("health check");
    });

});