import { InMemoryChatRepository } from "@/repositories/in-memory/in-memory-chat-repository";
import { CreateChatUseCase } from "./create-chat-use-case";

let chatRepository: InMemoryChatRepository; 
let sut: CreateChatUseCase;

describe("Create chat use case", () => {

    beforeEach(() => {
        chatRepository = new InMemoryChatRepository();
        sut = new CreateChatUseCase(chatRepository);
    });

    it("should be abre to create a chat", async () => {
        const chat = await sut.execute({ "prompt": "Return only a string saying 'health check'"});

        expect(chat.isSuccess()).toBeTruthy();
        expect(chat.value?.messages[1].sender === "model").toBeTruthy();
        expect(chat.value?.messages[1].content[0].text === "health check").toBeTruthy();
    });
});